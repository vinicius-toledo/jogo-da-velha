import { ThemeContext, ThemeProvider } from "@/context/themeContext";
import { Slot } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function ThemeToggleButton() {
  const { toggleTheme, theme, colors } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: colors.text,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
      }}
    >
      <Text style={{ color: colors.background, fontWeight: "bold" }}>
        {theme === "light" ? "Dark" : "Light"}
      </Text>
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <Slot />
        <ThemeToggleButton />
      </View>
    </ThemeProvider>
  );
}
