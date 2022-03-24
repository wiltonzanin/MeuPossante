import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView, TextInput, TouchableOpacity, Platform } from "react-native";

import api from "../../../../services/api";
import styles from "./styles";
import TextField from "../../../../components/textField";
import BackScreen from "../../../../components/backScreen";
import { Button } from "../../../../components/buttons";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingScreen from "../../../../components/loadingScreen";
import { SuccessModal, FeedbackModal } from "../../../../components/feedbackModal";
import DropDownPicker from "react-native-dropdown-picker";

interface Carros {
  id: number;
  modelo: string;
}

function CadastroServicos({navigation} : any) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [modalMensage, setModalMensage] = useState("");

  const [carros, setCarros] = useState<Carros[]>([]);
  const [carro, setCarro] = useState("");

  const [name, setName] = useState("")
  const [local, setLocal] = useState("")
  const [datafor, setdata] = useState("")
  const [ValorServico, setValorServico] = useState("")
  const [descricao, setDescricao] = useState("")

  const [date, setDate] = useState(new Date()); //validação data
  const [show, setShow] = useState(false); //validação datapicker
  const [mode, setMode] = useState('date'); //validação datapicker

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {

    api.get('carros/1').then(response => {
        setCarros(response.data);
    })
}, [])

  console.log("--------------------------------------")
  console.log("Nome:" + name)
  console.log("Local:" + local)
  console.log("Data:" + datafor)
  console.log("Valor:" + ValorServico)
  console.log("Descrição:" + descricao)
  console.log("teste id carro: " + carro)

  var dataformatada = date.getDate().toString().padStart(2, '0') + "/";
  dataformatada += (date.getMonth() + 1).toString().padStart(2, '0') + "/";
  dataformatada += date.getFullYear().toString();

  async function CadastrarBanco() {

    setdata(dataformatada.toString())

    const data = new FormData();

    data.append("name", name);
    data.append("local", local);
    data.append("data", datafor);
    data.append("valor", ValorServico);
    data.append("descricao", descricao);
    data.append("id_carro", carro);

    try{
      setCarregando(true)
      await api.post("/servico", data);
    } catch (error) {
      setCarregando(false);
      setModalMensage("");
      setModalWarning(true);
      return;
    }
    setModalMensage("Serviço cadastrado com sucesso!");
    setModalVisible(true);

  }

  function handleNavigateToVeiculos() {
    setModalVisible(!modalVisible);
    setCarregando(false);
    if (modalWarning == false) {
      navigation.navigate("VisualizarServicos");
    }
  }

  function closeModal() {
    setModalWarning(false);
    setCarregando(false);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LoadingScreen carregando={carregando} />
      <SuccessModal
        modalVisible={modalVisible}
        funcaoOnRequestClose={handleNavigateToVeiculos}
        mensage={modalMensage} />
      <FeedbackModal
        modalVisible={modalWarning}
        funcaoOnRequestClose={closeModal}
        mensage={modalMensage} />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackScreen />
          <Text style={styles.title}>Cadastre o serviço</Text>
          <View />
        </View>
        <View>
          <TextField
            labelName="Nome"
            onChangeText={setName}
            value={name}
          />
          <Text style={styles.text}>Veículo</Text>
                    <DropDownPicker
                        placeholder="Selecione um item"
                        dropDownStyle={styles.dropdownList}
                        labelStyle={styles.dropdownText}
                        arrowColor={"#F0EFF4"}
                        items={carros.map(carro => ({ label: carro.modelo, value: carro.id }))}
                        style={styles.dropdown}
                        onChangeItem={(item) => {
                            setCarro(item.value);
                        }}>
                    </DropDownPicker>


          <TextField
            labelName="Local que foi realizado o serviço"
            onChangeText={setLocal}
            value={local}
          />
          <View style={styles.inputGroup}>
            <View style={styles.inputGroupSecondColumn}>
              <TextField
                value={dataformatada}
                labelName="Data"
                onTouchStart={showDatepicker}
              />
              <View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
            <View style={styles.inputGroupColumn}>
              <TextField labelName="Valor do serviço"
                maxLength={6}
                placeholder="R$ 0.000,00"
                tipoTeclado={"numeric"}
                onChangeText={setValorServico}
                value={ValorServico}
              />
            </View>
          </View>

          <Text style={styles.text}>Descrição do serviço realizado:</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
            onChangeText={setDescricao}
            value={descricao}
            maxLength={255}
          />
        </View>
        <Button title="Concluir" onPress={CadastrarBanco} />
      </View>
    </ScrollView>
  );
}

export default CadastroServicos;
