import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// ✅ Tipo correto
export type Symbol = "aleatorio" | "x" | "o";

export type SymbolSelectorProps = {
  symbol: Symbol;
  setSymbol: React.Dispatch<React.SetStateAction<Symbol>>;
};

export default function SymbolSelector({
  symbol,
  setSymbol,
}: SymbolSelectorProps) {
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

      <View style={{ flexDirection: "row", gap: 15 }}>
        {(["aleatorio", "x", "o"] as Symbol[]).map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSymbol(value)}
            style={{
              backgroundColor:
                symbol === value ? colors.text : "transparent",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: colors.text,
            }}
          >
            <Text
              style={{
                color:
                  symbol === value
                    ? colors.background
                    : colors.text,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {value.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
