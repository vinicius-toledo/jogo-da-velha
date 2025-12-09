import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  // ⬅️ NOVO ESTILO ADICIONADO PARA A MENSAGEM DE STATUS
  status: {
    fontSize: 24, // Um tamanho bom para o status
    fontWeight: "600",
    marginVertical: 15,
    textAlign: "center",
    color: "#333", // Cor neutra para o status padrão (próximo jogador)
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
  },
  square: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mark: {
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  // Renomeado 'winner' para 'resultMessage' e ajustado para ser condicional em gameScreen.tsx
  winner: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
  },
});