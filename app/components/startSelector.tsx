import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  starter: "x" | "o" | "aleatorio";
  setStarter: (v: "x" | "o" | "aleatorio") => void;
};

export default function StarterSelector({ starter, setStarter }: Props) {
  const { colors } = useContext(ThemeContext);

  function Button(label: string, value: "x" | "o" | "aleatorio") {
    const active = starter === value;

    return (
      <TouchableOpacity
        onPress={() => setStarter(value)}
        style={{
          backgroundColor: active ? colors.text : "transparent",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: colors.text,
          marginHorizontal: 7,
        }}
        activeOpacity={0.8}
      >
        <Text
          style={{
            color: active ? colors.background : colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

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
        Quem começa?
      </Text>

      <View style={{ flexDirection: "row" }}>
        {Button("ALEATÓRIO", "aleatorio")}
        {Button("X", "x")}
        {Button("O", "o")}
      </View>
    </View>
  );
}
