import { ThemeContext } from "@/context/themeContext";
import { Link } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { colors } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          color: colors.text,
        }}
      >
        Jogo da Velha
      </Text>

      <Link href="/screens/gameScreen" asChild>
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
