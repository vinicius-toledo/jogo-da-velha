import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type SymbolSelectorProps = {
  symbol: string;                     // "aleatorio", "x" ou "o"
  setSymbol: (value: string) => void; // função que atualiza o estado no Home
};

export default function SymbolSelector({ symbol, setSymbol }: SymbolSelectorProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Escolha o símbolo
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        {/* ALEATÓRIO */}
        <TouchableOpacity
          onPress={() => setSymbol("aleatorio")}
          style={{
            backgroundColor: symbol === "aleatorio" ? colors.text : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.text,
          }}
        >
          <Text
            style={{
              color: symbol === "aleatorio" ? colors.background : colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            ALEATÓRIO
          </Text>
        </TouchableOpacity>

        {/* X */}
        <TouchableOpacity
          onPress={() => setSymbol("x")}
          style={{
            backgroundColor: symbol === "x" ? colors.text : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.text,
          }}
        >
          <Text
            style={{
              color: symbol === "x" ? colors.background : colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            X
          </Text>
        </TouchableOpacity>

        {/* O */}
        <TouchableOpacity
          onPress={() => setSymbol("o")}
          style={{
            backgroundColor: symbol === "o" ? colors.text : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.text,
          }}
        >
          <Text
            style={{
              color: symbol === "o" ? colors.background : colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            O
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
