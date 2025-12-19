import { ThemeContext } from "@/context/themeContext";
import { Difficulty } from "@/types/game";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
};

export default function DifficultySelector({
  difficulty,
  setDifficulty,
}: Props) {
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
        Dificuldade
      </Text>

      <View
        style={{
          width: "100%",
          gap: 10,
        }}
      >
        {(["EASY", "MEDIUM", "HARD"] as Difficulty[]).map((level) => {
          const selected = difficulty === level;

          return (
            <TouchableOpacity
              key={level}
              onPress={() => setDifficulty(level)}
              style={{
                backgroundColor: selected
                  ? colors.text
                  : "transparent",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: colors.text,
              }}
            >
              <Text
                style={{
                  color: selected
                    ? colors.background
                    : colors.text,
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {level}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
