import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  autonomia: {
    backgroundColor: "#F0EFF4",
    width: 145,
    height: 140,
    padding: 10,
    borderRadius: 10
  },

  textInfo1: {
    color: "#252525",
    fontSize: 18,
    paddingBottom: 5,
  },

  textInfo2: {
    color: "#252525",
    fontSize: 14,
  },

  textInfo: {
    color: "#F0EFF4",
    fontSize: 18,
  },

  textInfoService: {
    color: "#F0EFF4",
    fontSize: 18,
    fontWeight: 'bold',
  },


  textInfoCampo: {
    color: "#F0EFF4",
    fontSize: 16,
    paddingBottom: 20,
  },

  textInfoCampo1: {
    color: "#F0EFF4",
    fontSize: 16,
    paddingBottom: 20,
    paddingHorizontal: 10
  },

  card: {
    maxHeight: 10,
  },


  infos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  servicos: {
    marginTop: 20,
  },

  buttonServico: {
    backgroundColor: "#F0EFF4",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },

  ButtonText: {
    flexDirection: "column",
    padding: 10,
  },

  buttonGroupText: {
    justifyContent: "space-between",
  },

  buttonServiceTextGreen: {
    color: "#5CB85C",
    fontSize: 16,
    padding: 35,
  },

  buttonVeiculoTextManutencaoRed: {
    color: "#D9534F",
    fontSize: 16,
    padding: 35,
  },
});

export default styles;
