import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
        Jogo da Velha
      </Text>

      <Link href="/screens/gameScreen" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Iniciar Jogo</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
