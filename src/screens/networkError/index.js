import React from "react";
import { useNavigation } from '@react-navigation/native';
import { useData } from "../../hooks/data";
import { Container, Image, ButtomReload, Label, Title, ButtomLogout } from './style';
export default function errorPage(){
    const { webview } = useData();
    const navigation = useNavigation();

    function reconnect(){
        webview.reload();
        navigation.goBack();
    }
    
    function exit(){
        navigation.navigate('Login');
    }

    return(
        <Container>
            <Image source={require('../../assets/error.png')}/>
            <Title>Sem conexão! Verifique a rede do disposítivo ou a conexão com o servidor!</Title>
            <ButtomReload onPress={reconnect}>
                <Label>TESTAR CONEXÂO</Label>
            </ButtomReload>
            <ButtomLogout onPress={exit}>
                <Label>LOGOUT</Label>
            </ButtomLogout>
        </Container>
    );
}