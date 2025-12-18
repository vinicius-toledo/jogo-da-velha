import { ThemeContext, ThemeProvider } from "@/context/themeContext";
import { Slot } from "expo-router";
import { useContext } from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";

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

function LayoutContent() {
  const { images } = useContext(ThemeContext);

  return (
    <ImageBackground
      source={images.background}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Slot />
      <ThemeToggleButton />
    </ImageBackground>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
