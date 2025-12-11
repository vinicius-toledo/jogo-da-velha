import { ThemeContext } from "@/context/themeContext";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import ModeSelector from "../components/modeSelector";
import SymbolSelector from "../components/symbolSelector";

import { styles } from "../styles";

export default function Home() {
  const { colors } = useContext(ThemeContext);

  const [mode, setMode] = useState("computador");
  const [symbol, setSymbol] = useState("aleatorio");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
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

      {/* Seção do modo */}
      <View style={styles.section}>
        <ModeSelector mode={mode} setMode={setMode} />
      </View>

      {/* Seção dos símbolos */}
      <View style={styles.section}>
        <SymbolSelector symbol={symbol} setSymbol={setSymbol} />
      </View>

      <Link
        href={{
          pathname: "/screens/gameScreen",
          params: { mode, symbol },
        }}
        asChild
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.text,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.background, fontSize: 18 }}>
            Iniciar Jogo
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
