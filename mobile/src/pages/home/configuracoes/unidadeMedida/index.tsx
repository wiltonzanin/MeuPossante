import React from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import BackScreen from "../../../../components/backScreen";

function UnidadeMedida() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
          <View style={{width:'100%', alignItems:'center', flexDirection:'row'}}>
        <View style={styles.header}>
          <BackScreen />
          </View>
          <View style={{paddingLeft:'30%'}}>

          <Text style={styles.title}>Unidades de medida</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <View>
              <Text style={styles.title}>Tipo de métrica</Text>
              <DropDownPicker
                placeholder="Selecione um item"
                dropDownStyle={{
                  backgroundColor: "#333333",
                  borderColor: "#525252",
                  width: '100%',
                }}
                
                labelStyle={{
                  fontSize: 16,
                  color: "#fff",
                }}
                arrowColor={"white"}
                items={[
                  { label: "Quilômetros", value: "Quilometros" },
                  { label: "Milhas", value: "Milhas" },
                ]}
                style={styles.dropdown}
              ></DropDownPicker>
            </View>
            <View style={{paddingTop:20}}>
              <Text style={styles.title}>Unidade de medida de volume</Text>
              <DropDownPicker
                placeholder="Selecione um item"
                dropDownStyle={{
                  backgroundColor: "#333333",
                  borderColor: "#525252",
                  width: '100%',
                }}
                labelStyle={{
                  fontSize: 16,
                  color: "#fff",
                }}
                arrowColor={"white"}
                items={[
                  { label: "Litros", value: "Litros" },
                  { label: "Galões", value: "galoes" },
                ]}
                style={styles.dropdown}
              ></DropDownPicker>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UnidadeMedida;
