// app/screens/GameScreen.tsx
import { ThemeContext } from "@/context/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { checkWinner, getBestMove } from "../../service/gameLogic";
import { styles } from "../styles";



type BoardState = (string | null)[];

export default function GameScreen() {
  const { colors } = useContext(ThemeContext);

  // Recebe params vindos do Home (ex: mode="computador", symbol="aleatorio"|"x"|"o")
  const params = useLocalSearchParams() as { mode?: string; symbol?: string };
  const mode = params.mode ?? "local";     // padrão: local (jogador vs jogador)
  const symbolParam = (params.symbol ?? "x").toString().toLowerCase(); // "aleatorio"|"x"|"o"

  // estado do tabuleiro e controle do jogo
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [current, setCurrent] = useState<string>("X"); // quem joga agora
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  // define quem é humano e quem é IA (apenas relevante se mode === "computador")
  // interpretamos symbolParam: "x" => humano joga X; "o" => humano joga O; "aleatorio" => escolhe aleatório no início
  const [human, setHuman] = useState<string>("X");
  const [ai, setAi] = useState<string>("O");

  // Inicializa símbolos e quem começa (executa uma vez)
  useEffect(() => {
    let humanSymbol = "X";

    if (symbolParam === "x") humanSymbol = "X";
    else if (symbolParam === "o") humanSymbol = "O";
    else if (symbolParam === "aleatorio") humanSymbol = Math.random() > 0.5 ? "X" : "O";

    setHuman(humanSymbol);
    setAi(humanSymbol === "X" ? "O" : "X");

    // quem começa? normalmente X começa. Se o humano não for X e o modo for computador,
    // a IA deve jogar primeiro (pois escolhemos humanSymbol e se humanSymbol === "O", X = AI)
    setCurrent("X");
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // executa apenas no mount

  // Quando o board muda, verificar vitória/empate
  useEffect(() => {
    const result = checkWinner(board);
    if (result === "Empate") {
      setIsDraw(true);
      setWinner(null);
      return;
    }
    if (result === "X" || result === "O") {
      setWinner(result);
      return;
    }
  }, [board]);

  // Efeito que dispara a jogada da IA automaticamente quando for a vez dela
  useEffect(() => {
    // Só executar se modo for "computador" (pt-BR)
    if (mode !== "computador") return;
    // Só se não houver vencedor nem empate
    if (winner || isDraw) return;
    // Só se for a vez da IA
    if (current !== ai) return;

    // delay para parecer natural
    const t = setTimeout(() => {
      // escolhe melhor movimento
      const move = getBestMove(board, ai, human);
      if (move === undefined || move === null) return;

      // aplica movimento da IA
      setBoard(prev => {
        const copy = [...prev];
        if (copy[move] === null) {
          copy[move] = ai;
        }
        return copy;
      });

      // passa a vez ao outro
      setCurrent(h => (h === "X" ? "O" : "X"));
    }, 450);

    return () => clearTimeout(t);
  }, [current, board, mode, ai, human, winner, isDraw]);

  // Função que trata o toque do jogador em uma célula
  function handlePress(index: number) {
    // bloqueios básicos
    if (board[index] !== null) return;      // já preenchido
    if (winner || isDraw) return;           // jogo acabou

    // se modo for computador e NÃO for a vez do humano, bloqueia toques
    if (mode === "computador" && current !== human) return;

    // aplica jogada do humano (current deve ser igual ao símbolo do humano)
    setBoard(prev => {
      const copy = [...prev];
      copy[index] = current;
      return copy;
    });

    // passa turno
    setCurrent(prev => (prev === "X" ? "O" : "X"));
  }

  // Reinicia o jogo (mantendo as escolhas de símbolo/mode)
  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
    setCurrent("X");
    // se o símbolo foi aleatório, redecidir quem é humano/ai
    if (symbolParam === "aleatorio") {
      const humanSymbol = Math.random() > 0.5 ? "X" : "O";
      setHuman(humanSymbol);
      setAi(humanSymbol === "X" ? "O" : "X");
      setCurrent("X");
    } else {
      setHuman(symbolParam === "o" ? "O" : "X");
      setAi(symbolParam === "o" ? "X" : "O");
      setCurrent("X");
    }
  }

  const statusMessage = useMemo(() => {
    if (winner) return `Vencedor: ${winner}`;
    if (isDraw) return "Empate!";
    return `Vez: ${current}`;
  }, [winner, isDraw, current]);

  return (
 <View style={styles.container}>


      {/* BOTÃO DE VOLTAR */}
<View style={styles.backContainer}>
  <TouchableOpacity
    onPress={() => router.back()}
    style={[
      styles.backButton,
      { backgroundColor: colors.text }
    ]}
  >
    <Ionicons
      name="arrow-back-circle"
      size={28}
      color={colors.background}
      style={{ marginRight: 6 }}
    />
    <Text
      style={[
        styles.backButtonText,
        { color: colors.background }
      ]}
    >
      Voltar
    </Text>
  </TouchableOpacity>
</View>



      <Text style={[styles.title, { color: colors.text }]}>Jogo da Velha</Text>

      <Text style={[styles.status, { color: colors.text }]}>{statusMessage}</Text>

      <View style={[styles.board, { borderColor: colors.text }]}>
        {board.map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            activeOpacity={0.8}
            style={[styles.square, { borderColor: colors.text }]}
            // se for vez da IA, bloqueia o toque (in-line safeguard)
            disabled={mode === "computador" && current !== human}
          >
            <Text style={[styles.mark, { color: colors.text }]}>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {(winner || isDraw) && (
        <TouchableOpacity
          onPress={resetGame}
          style={[styles.button, { backgroundColor: colors.text }]}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
