import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    padding: 20,
    justifyContent: "space-between",
  },

  header: {
    width: "100%",
    paddingTop: 20,
  },

  title: {
    color: "#F0EFF4",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 20,
  },

  instructions: {
    color: "#F0EFF4",
    fontSize: 16,
    textAlign: "auto",
  },

  buttonContent: {
    paddingTop: 20,
  },

  buttonStyle: {
    width: "100%",
  },

  buttonText: {
    color: "#F0EFF4",
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#8F1622",
    height: 60,
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
