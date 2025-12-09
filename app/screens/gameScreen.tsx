import { ThemeContext } from "@/context/themeContext";
import React, { useContext, useMemo, useState } from "react"; // ⬅️ CORRIGIDO: Hooks importados por desestruturação
import { Text, TouchableOpacity, View } from "react-native";
import { checkWinner } from "../logic/gameLogic";

import { styles } from "../styles";

// Define o tipo para o estado do tabuleiro
type BoardState = (string | null)[];

export default function GameScreen() {
    // Usando Hooks sem o prefixo 'React.'
    const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
    const [player, setPlayer] = useState<string>("X");
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const { colors } = useContext(ThemeContext);


    function handlePress(index: number) {
        if (board[index] !== null || winner !== null || isDraw) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const result = checkWinner(newBoard);

        if (result) {
            setWinner(result);
            return;
        }

        // CORRIGIDO: Tipagem explícita de 'cell'
        if (newBoard.every((cell: string | null) => cell !== null)) {
            setIsDraw(true);
            return;
        }

        setPlayer(player === "X" ? "O" : "X");
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setPlayer("X");
        setWinner(null);
        setIsDraw(false);
    }

    // Hook 'useMemo' corrigido
    const statusMessage = useMemo(() => {
        if (winner) {
            return `Vencedor: ${winner} 🥳`;
        }
        if (isDraw) {
            return `Empate! 🤝`;
        }
        return `Próximo Jogador: ${player}`;
    }, [winner, isDraw, player]);

    return (
       <View style={[styles.container, { backgroundColor: colors.background }]}>
  <Text style={[styles.title, { color: colors.text }]}>Jogo da Velha</Text>

  <Text style={[styles.status, { color: colors.text }]}>
    {statusMessage}
  </Text>

  <View style={[styles.board, { borderColor: colors.text }]}>
      {board.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.square, { borderColor: colors.text }]}
          onPress={() => handlePress(index)}
        >
          <Text style={[styles.mark, { color: colors.text }]}>{value}</Text>
        </TouchableOpacity>
      ))}
  </View>

  {(winner || isDraw || board.some(cell => cell !== null)) && (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.text }]}
      onPress={resetGame}
    >
      <Text style={[styles.buttonText, { color: colors.background }]}>
        Reiniciar Jogo
      </Text>
    </TouchableOpacity>
  )}
</View>

    );
}