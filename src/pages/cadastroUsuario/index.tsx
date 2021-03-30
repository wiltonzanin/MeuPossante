import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';
import styles from './styles';
import TextField from '../../components/textField';
import BackScreen from '../../components/backScreen';

function CadastroUsuario() {

    const { navigate } = useNavigation();

    function handleNavigateToCadastroVeiculo() {
        navigate('CadastroVeiculo');
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackScreen/>
                    <Text style={styles.title}>Vamos começar:</Text>
                </View>
                <View style={styles.content}>
                    <TextField labelName="Nome" />
                    <TextField labelName="Email" tipoTeclado={"email-address"} />
                    <TextField labelName="Senha" />
                    <TextField labelName="Confirme sua senha" />
                </View>
                <View style={styles.buttonStyle}>
                    <RectButton onPress={handleNavigateToCadastroVeiculo} style={styles.button}>
                        <Text style={styles.buttonText}>Próximo</Text>
                    </RectButton>
                </View>
            </View>
        </ScrollView>
    );
}

export default CadastroUsuario;