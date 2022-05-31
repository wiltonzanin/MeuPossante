import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { DrawerActions, useRoute } from "@react-navigation/native";
import styles from "./DetalhesVeiculoStyle";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import BackButton from "../../../components/backScreen";
import { Infos } from "../../../components/infos";
import { DecisionModal } from "../../../components/feedbackModal";
import { ButtonAdicionar, ButtonDeletar } from '../../../components/buttons';
import api from "../../../services/api";
import CarroService from "../../../database/services/carroService";
import ImagensCarroService from "../../../database/services/imagensCarroService";

interface DetalhesCarroRouteParams {
  id: number;
};

interface Carro {
  id: number;
  marca: string;
  modelo: string;
  motorizacao: string;
  ano: number;
  combustivel: string;
}

interface ImagensCarro {
  id_imagem: number;
  path: string;
}

interface Autonomia {
  id: number;
  tipoCombustivel: string;
  percurso: string;
  mediaConsumo: number;
}

interface servico {
  id: number;
  nome: string;
  local: string;
  datafor: string;
}

function VisualizarVeiculo({ navigation }: any) {

  const route = useRoute();
  const params = route.params as DetalhesCarroRouteParams;
  const [erroCarregar, setErroCarregar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [modalDecisionVisible, setModalDecisionVisible] = useState(false);
  const [carros, setCarros] = useState<Carro>();
  const [imgCarro, setImgCarro] = useState<ImagensCarro[]>([]);
  const [autonomia, setAutonomia] = useState<Autonomia>();
  const [servico, setServico] = useState<servico[]>([]);

  useEffect(() => {
    CarroService.findCarById(params.id)
      .then((response: any) => {
        setCarros(response)
      }), (error: any) => {
        console.log(error);
      }
  }, []);

  useEffect(() => {
    ImagensCarroService.findAll(params.id)
      .then((response: any) => {
        setImgCarro(response._array)
      }), (error: any) => {
        console.log(error);
      }
  }, []);

  // useEffect(() => {
  //   api
  //     .get(`carros/detalhes/${params.id}`)
  //     .then((response) => setCarro(response.data));
  // }, [params.id]);

  // useEffect(() => {
  //   api
  //     .get(`autonomia/last/${params.id}`)
  //     .then((response) => setAutonomia(response.data));
  // }, [params.id]);


  // useEffect(() => {
  //   api
  //     .get(`servico/last/${params.id}`)
  //     .then((response) => setServico(response.data));
  // }, [params.id]);

  function handleNavigateToVisualizarServicos(id: number) {
    navigation.navigate("VisualizarServicos", { id });
  }

  function handleNavigateToServicos() {
    navigation.navigate("Servico");
  }

  async function deteleVeiculo() {
    setModalDecisionVisible(true);
    await CarroService.deleteCarById(params.id)
  }

  // async function deteleVeiculo() {
  //   setModalDecisionVisible(true);
  //   try {
  //     setCarregando(true)
  //     await api.delete(`/carros/delete/${params.id}`);
  //   } catch (error) {
  //     return;
  //   }
  // }

  function fecharModal() {
    setModalDecisionVisible(!modalDecisionVisible);
  }

  function handleDeleteVehicle() {
    setModalDecisionVisible(!modalDecisionVisible);
    navigation.navigate("VeiculosCadastrados");
  }

  //Adicionar tratamento
  if (!carros) {
    return (
      <Text>Erro</Text>
    );
  }

  return (
    <ScrollView>
      <DecisionModal
        modalVisible={modalDecisionVisible}
        funcaoOnRequestClose={handleDeleteVehicle}
        funcaoFecharModal={fecharModal}
        mensage={"Você realmente deseja excluir este veículo?"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.text}>{carros.modelo}</Text>
          <RectButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name="edit" size={25} color="#F0EFF4" />
          </RectButton>
        </View>
        <View>
          {imgCarro.length == 0
            ? <View style={{ marginTop: 20 }}></View>
            :
            <View style={styles.imagesContainer}>
              <ScrollView horizontal pagingEnabled>
                {imgCarro.map((image) => {
                  return (
                    <Image
                      key={image.id_imagem}
                      source={{ uri: image.path }}
                      style={styles.imgVeiculo}
                    />
                  );
                })}
              </ScrollView>
            </View>
          }
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informações</Text>
            <Infos
              marca={carros.marca}
              ano={carros.ano}
              motorizacao={carros.motorizacao}
              modelo={carros.modelo}
              combustivel={carros.combustivel}
            />
          </View>
          <View style={styles.card}>
            <RectButton onPress={handleNavigateToServicos}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Serviços</Text>
                <Feather name="chevron-right" size={24} color="#F0EFF4" />
              </View>
            </RectButton>
            {!servico
              ?
              <View style={styles.noInfo}>
                <Feather name="alert-circle" size={25} color="#eca400" />
                <Text style={styles.noInfoText}>Você ainda não possui uma serviço cadastrado!</Text>
              </View>
              :
              servico.map(servico => {
                return (
                  <View key={servico.id} style={styles.servicos}>
                    <RectButton style={styles.buttonServico} onPress={() => handleNavigateToVisualizarServicos(servico.id)}>
                      <View style={styles.buttonGroupTextServico}>
                        <Text style={styles.buttonServicoText}>{servico.nome}</Text>
                        <Text style={styles.textInfo2}>{servico.local || "-----"}</Text>
                        <Text style={styles.textInfo2}>{servico.datafor}</Text>
                      </View>
                    </RectButton>
                  </View>
                );
              })
            }
          </View>
          <View style={styles.cardStyle}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Autonomia</Text>
              <Feather name="chevron-right" size={24} color="#F0EFF4" />
            </View>
            {!autonomia
              ?
              <View style={styles.noInfo}>
                <Feather name="alert-circle" size={25} color="#eca400" />
                <Text style={styles.noInfoText}>Você ainda não possui uma autonomia cadastrada!</Text>
              </View>
              :
              <View style={[carros.combustivel.includes("flex") ? styles.infoGroup : styles.info]}>
                <View>
                  <Text style={styles.buttonServicoText}>{autonomia.tipoCombustivel}</Text>
                  <Text style={styles.textInfo2}>{autonomia.percurso}</Text>
                  <Text style={styles.textInfo2}>{autonomia.mediaConsumo} Km/L</Text>
                </View>
              </View>
            }
          </View>
          <View style={styles.deleteButton}>
            <ButtonDeletar title="Deletar" onPress={() => deteleVeiculo()}></ButtonDeletar>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default VisualizarVeiculo;
