import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from 'react-native-elements';
import styles from "./styles";
import TextField from "../../../../components/textField";
import BackScreen from "../../../../components/backScreen";
import { Button } from "../../../../components/buttons";
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingScreen from "../../../../components/loadingScreen";
import { SuccessModal, FeedbackModal } from "../../../../components/feedbackModal";
import { color } from "react-native-reanimated";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";
import colors from "../../../../Styles/colors";
import fonts from "../../../../Styles/fonts";
import ServicoService from "../../../../database/services/ServicoService";
import CarroService from "../../../../database/services/carroService";
import { Servico } from "@components/infos";

interface Carros {
  id_carro: number;
  modelo: string;
  motorizacao: string;
  ano: number;
}

function CadastroServicos({navigation} : any) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [modalMensage, setModalMensage] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [carros, setCarros] = useState<Carros[]>([]);
  const [id_carro, setCarro] = useState("");
  const [CarFind, setCarFind] = useState<Carros[]>([]);
  const [name, setName] = useState("")
  const [local, setLocal] = useState("")
  const [ValorServico, setValorServico] = useState("")
  const [Quilometragem, setQuilometragem] = useState("")
  const [descricao, setDescricao] = useState("")
  var [ServicoStatus, setServicoStatus] = useState("")

  const [date, setDate] = useState(new Date()); //validação data
  const [show, setShow] = useState(false); //validação datapicker
  const [mode, setMode] = useState('date'); //validação datapicker
      
  const [ValidacaoNome, setValidacaoNome] = useState("")
  const [ValidacaoVeiculo, setValidacaoVeiculo] = useState("")
  const [ValidacaoQuilometragem, setValidacaoQuilometragem] = useState("")
  const [ValidacaoValorServico, setValidacaoValorServico] = useState("")

 
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
    CarroService.findAll() //User ID
      .then((response: any) => {
        setCarros(response._array);
        console.log("procurou todos os carros")
      }).catch(() => {
      })
  }, []);

var dataformatada = date.getDate().toString().padStart(2, '0') + "/";
dataformatada += (date.getMonth() + 1).toString().padStart(2, '0') + "/";
dataformatada += date.getFullYear().toString();

  if(isSelected == true){
    ServicoStatus = "1"
  }
  else{
    ServicoStatus = "0"
  }

function validacao(){
    // Nome
    if (!name) {
      setValidacaoNome('Nome não informado') 
    }
    else {
      setValidacaoNome('')
    }

    // Veiculo
    if (!id_carro) {
      setValidacaoVeiculo('Veiculo não informado') 
      alert("Insira um veiculo")
    }
    else {
      setValidacaoVeiculo('')
    }

    // Quilometragem  
    if (((!isNaN(parseFloat(Quilometragem)) && isFinite(Quilometragem)) || !Quilometragem) === false) {
      setValidacaoQuilometragem('Somente numeros!')
    }
    else {
      setValidacaoQuilometragem('')
    }

    // ValorServico
    if (((!isNaN(parseFloat(ValorServico)) && isFinite(ValorServico)) || !ValorServico ) === false) {
      setValidacaoValorServico('Somente numeros!')
    }
    else {
      setValidacaoValorServico('')
    }

    //após validação 
    if(( ((!isNaN(ValorServico)) && isFinite(ValorServico)) === true && !id_carro === false && ((!isNaN(Quilometragem)) && isFinite(Quilometragem)) === true  && !name === false)){
      CadastrarBanco();
      console.log("Cadastrou no banco");
    }
}

  /*async function CadastrarBanco() {

    const dataserv = (dataformatada.toString())
    const data = new FormData();

    data.append("nome", name);
    data.append("local", local);
    data.append("quilometragem", Quilometragem);
    data.append("datafor", dataserv);
    data.append("ValorServico", ValorServico);
    data.append("descricao", descricao);
    data.append("statusServico", ServicoStatus);
    data.append("id_carro", id_carro);

    try{
      setCarregando(true)
      await api.post("/servico", data);
    } 
    catch (error) {
      setCarregando(false);
      setModalMensage("");
      setModalWarning(true);
      return;
    }
    setModalMensage("Serviço cadastrado com sucesso!");
    setModalVisible(true);
  }
  */

  function CadastrarBanco() {
    try {
      const dataserv = (dataformatada.toString())
      const data = new FormData();
      ServicoService.addservico(name, local, Number(Quilometragem), dataserv, Number(ValorServico), descricao, Number(ServicoStatus), Number(id_carro));
      setModalMensage("Serviço cadastrado com sucesso!");
      setModalVisible(true);
      console.log("Cadastrou no banco1");
    } catch (error) {
      setModalMensage("Ops, tivemos um problema!"); //Não chega no catch
      setModalWarning(true);
    }
  }

  function handleNavigateToServico() {
    setModalVisible(!modalVisible);
    setCarregando(false);
    if (modalWarning == false){
      navigation.navigate("Servico");
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
        funcaoOnRequestClose={handleNavigateToServico}
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
            labelName="Nome *"
            onChangeText={setName}
            value={name}
            mensagemErro = {ValidacaoNome}
          />
          <TextField 
            labelName="Local que foi realizado o serviço"
            onChangeText={setLocal}
            value={local}
          />
          <View style={styles.inputGroup}>
            <View style={styles.inputGroupSecondColumn}>
              <Text style={styles.text}>Veículo *</Text>
              <DropDownPicker
                  dropDownStyle={styles.dropdownList}
                  labelStyle={styles.dropdownText}
                  arrowColor={colors.grayLight}
                  placeholder="Selecionar..."
                  items={carros.map(carro => ({ label: carro.modelo + " " + carro.motorizacao + " " + carro.ano, value: carro.id_carro }))}
                  style={styles.dropdown}
                  onChangeItem={(item) => {
                      setCarro(item.value);
              }}>
              </DropDownPicker>
            </View>
            <View style={styles.inputGroupColumn}>
              <TextField labelName="Quilometragem"
                maxLength={8}
                tipoTeclado={"numeric"}
                onChangeText={setQuilometragem}
                value={Quilometragem}
                mensagemErro = {ValidacaoQuilometragem}
              />
            </View>
          </View>
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
                mensagemErro = {ValidacaoValorServico}
                placeholderTextColor = {colors.grayLight}
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
            <View style={styles.checkbox}>
            <CheckBox
              containerStyle={{ backgroundColor: colors.background, borderColor: colors.background, padding: 0, margin: 0, marginLeft: 0 }}
              checkedIcon='check-square-o'
              checkedColor={colors.button}
              size={25}
              checked={isSelected}
              onPress={() => setIsSelected(!isSelected)} 
            />
            <View style={styles.buttoncheckbox}>
              <Text style={styles.textcheckbox}>Serviço foi realizado</Text>
            </View>
          </View>
        </View>
        <Button title="Concluir" onPress={validacao} />
      </View>
    </ScrollView>
  );
}

export default CadastroServicos;
