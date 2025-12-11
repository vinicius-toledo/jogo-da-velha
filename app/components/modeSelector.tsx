import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type ModeSelectorProps = {
  mode: string;                  // opção escolhida: "computador" ou "jogador"
  setMode: (value: string) => void;  // função para atualizar o estado no Home
};

export default function ModeSelector({ mode, setMode }: ModeSelectorProps) {
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
        Escolha o modo
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        {/* Botão Computador */}
        <TouchableOpacity
          onPress={() => setMode("computador")}
          style={{
            backgroundColor: mode === "computador" ? colors.text : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.text,
          }}
        >
          <Text
            style={{
              color: mode === "computador" ? colors.background : colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            COMPUTADOR
          </Text>
        </TouchableOpacity>

        {/* Botão Jogador */}
        <TouchableOpacity
          onPress={() => setMode("jogador")}
          style={{
            backgroundColor: mode === "jogador" ? colors.text : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.text,
          }}
        >
          <Text
            style={{
              color: mode === "jogador" ? colors.background : colors.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            JOGADOR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
