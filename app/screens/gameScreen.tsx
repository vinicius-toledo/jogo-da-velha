import { ThemeContext } from "@/context/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import {
  checkWinner,
  Difficulty,
  getComputerMove,
} from "../../service/gameLogic";

import { styles } from "../styles";

type BoardState = (string | null)[];

export default function GameScreen() {
  const { colors } = useContext(ThemeContext);

  // =====================
  // Params
  // =====================
  const params = useLocalSearchParams() as {
    mode?: string;
    symbol?: string;
    starter?: string;
    difficulty?: Difficulty;
  };

  const mode = params.mode ?? "local";
  const symbolParam = (params.symbol ?? "x").toLowerCase();
  const starterParam = (params.starter ?? "aleatorio").toLowerCase();
  const difficulty: Difficulty = params.difficulty ?? "MEDIUM";

  // =====================
  // Estados do jogo
  // =====================
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [current, setCurrent] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const [human, setHuman] = useState<"X" | "O">("X");
  const [ai, setAi] = useState<"X" | "O">("O");
  const [starterSymbol, setStarterSymbol] = useState<"X" | "O">("X");

  // =====================
  // Inicialização
  // =====================
  useEffect(() => {
    let humanSymbol: "X" | "O" = "X";

    if (symbolParam === "x") humanSymbol = "X";
    else if (symbolParam === "o") humanSymbol = "O";
    else humanSymbol = Math.random() > 0.5 ? "X" : "O";

    setHuman(humanSymbol);
    setAi(humanSymbol === "X" ? "O" : "X");

    let start: "X" | "O" = "X";

    if (starterParam === "x") start = "X";
    else if (starterParam === "o") start = "O";
    else start = Math.random() > 0.5 ? "X" : "O";

    setStarterSymbol(start);
    setCurrent(start);

    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
  }, []);

  // =====================
  // Verificar vencedor
  // =====================
  useEffect(() => {
    const result = checkWinner(board);

    if (result === "Empate") {
      setIsDraw(true);
      setWinner(null);
    } else if (result === "X" || result === "O") {
      setWinner(result);
    }
  }, [board]);

  // =====================
  // Jogada da IA
  // =====================
  useEffect(() => {
    if (mode !== "computador") return;
    if (winner || isDraw) return;
    if (current !== ai) return;

    const t = setTimeout(() => {
      const move = getComputerMove(
        board,
        ai,
        human,
        difficulty
      );

      if (move === null || move === undefined) return;

      setBoard((prev) => {
        const copy = [...prev];
        copy[move] = ai;
        return copy;
      });

      setCurrent((prev) => (prev === "X" ? "O" : "X"));
    }, 450);

    return () => clearTimeout(t);
  }, [current, board, ai, human, mode, winner, isDraw, difficulty]);

  // =====================
  // Jogada do humano
  // =====================
  function handlePress(index: number) {
    if (board[index] !== null) return;
    if (winner || isDraw) return;
    if (mode === "computador" && current !== human) return;

    setBoard((prev) => {
      const copy = [...prev];
      copy[index] = current;
      return copy;
    });

    setCurrent((prev) => (prev === "X" ? "O" : "X"));
  }

  // =====================
  // Reset
  // =====================
  function resetGame() {
    const nextStarter = starterSymbol === "X" ? "O" : "X";

    setStarterSymbol(nextStarter);
    setCurrent(nextStarter);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
  }

  // =====================
  // Status
  // =====================
  const statusMessage = useMemo(() => {
    if (winner) return `Vencedor: ${winner}`;
    if (isDraw) return "Empate!";
    return `Vez: ${current}`;
  }, [winner, isDraw, current]);

  // =====================
  // UI
  // =====================
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.backButton,
            { backgroundColor: colors.text },
          ]}
        >
          <Ionicons
            name="arrow-back-circle"
            size={28}
            color={colors.background}
          />
          <Text
            style={[
              styles.backButtonText,
              { color: colors.background },
            ]}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        Jogo da Velha
      </Text>

      <Text style={[styles.status, { color: colors.text }]}>
        {statusMessage}
      </Text>

      <View style={[styles.board, { borderColor: colors.text }]}>
        {board.map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            style={[styles.square, { borderColor: colors.text }]}
            disabled={mode === "computador" && current !== human}
          >
            <Text style={[styles.mark, { color: colors.text }]}>
              {v}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {(winner || isDraw) && (
        <TouchableOpacity
          onPress={resetGame}
          style={[styles.button, { backgroundColor: colors.text }]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: colors.background },
            ]}
          >
            Reiniciar Jogo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
