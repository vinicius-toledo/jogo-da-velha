import { ThemeContext } from "@/context/themeContext";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import DifficultySelector from "../components/difficultySelector";
import ModeSelector from "../components/modeSelector";
import StarterSelector from "../components/startSelector";
import SymbolSelector from "../components/symbolSelector";

import { styles } from "../styles";

// =====================
// Tipos
// =====================
type Mode = "computador" | "jogador";
type Symbol = "x" | "o" | "aleatorio";
type Starter = "x" | "o" | "aleatorio";
type Difficulty = "EASY" | "MEDIUM" | "HARD";

export default function Home() {
  const { colors } = useContext(ThemeContext);

  const [mode, setMode] = useState<Mode>("computador");
  const [symbol, setSymbol] = useState<Symbol>("aleatorio");
  const [starter, setStarter] = useState<Starter>("aleatorio");
  const [difficulty, setDifficulty] =
    useState<Difficulty>("MEDIUM");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* Título */}
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          marginTop: 20,
          color: colors.text,
        }}
      >
        Jogo da Velha
      </Text>

      {/* Modo */}
      <View style={styles.section}>
        <ModeSelector mode={mode} setMode={setMode} />
      </View>

      {/* Dificuldade (somente vs computador) */}
      {mode === "computador" && (
        <View style={styles.section}>
          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </View>
      )}

      {/* Símbolo */}
      <View style={styles.section}>
        <SymbolSelector symbol={symbol} setSymbol={setSymbol} />
      </View>

      {/* Quem começa */}
      <View style={styles.section}>
        <StarterSelector starter={starter} setStarter={setStarter} />
      </View>

      {/* Botão iniciar */}
      <Link
        href={{
          pathname: "/screens/gameScreen",
          params: {
            mode,
            symbol,
            starter,
            difficulty,
          },
        }}
        asChild
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.text,
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: colors.background,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Iniciar Jogo
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
