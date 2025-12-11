import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor será aplicada no componente
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    // color virá do tema
  },

  status: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 15,
    textAlign: "center",
    // color virá do tema
  },

  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2, // cor do border virá do tema
  },

  square: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1, // cor virá do tema
    justifyContent: "center",
    alignItems: "center",
  },

  mark: {
    fontSize: 40,
    fontWeight: "bold",
    // color virá do tema
  },

  button: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    // backgroundColor virá do tema
  },

  buttonText: {
    fontSize: 18,
    // color virá do tema
  },

  winner: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    // color virá do tema
  },

  section: {
  width: "100%",
  borderWidth: 2,
  borderColor: "#888",
  padding: 20,
  borderRadius: 12,
  marginVertical: 10,
},

backContainer: {
    width: "35%",
    paddingHorizontal: 16,
    paddingTop: 40,
    position: "absolute",
    top: 10,
    left: 10,
},

backButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 8,
},


backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
},


});
