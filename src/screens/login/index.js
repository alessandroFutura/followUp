import React, {useState} from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api from '../../services/api';
import { useData } from "../../hooks/data";

import Picker from '../../components/Picker';
import SnackbarMessage from '../../components/SnackBar';
import { Input } from "@rneui/themed";

import {
  Footer,
  Content,
  LabelBtn,
  LogoArea,
  Container, 
  ConfirmBtn,
  VersionApp,
  LogoFutura,
} from './style.android';


export default ()=>{
  const navigation = useNavigation();

  const { device, ipAddress, setModalShow, currentConn, setVisibleSnackbar } = useData();
  const [user, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const login = async ()=>{
    setLoading(true);
    if(!user || !password){
      setVisibleSnackbar(true);
      setWarningMessage('Usuário ou senha não informados!');
      setLoading(false);
    } else {
      var data = {
        user_user: user,
        user_pass: password,
        device_guid: await AsyncStorage.getItem('@device_Key'),
        AppVersion: device.version,
        HostName: device.device_device,
        Platform: device.platform,
        HostIp: ipAddress
    }
      
      Api.login(data)
      .then((response) => {
          if(response.status.code == '200'){
             
              navigation.reset({
                  index:0,
                  routes:[{name:"WebView"}]
              });
          } else{
            setLoading(false);
            setVisibleSnackbar(true);
            setWarningMessage(response.status.description);
          }
      })
      .catch((response) => { 
      });
    }
  }
 
  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}} >
          <Container>
              <VersionApp>VERSÃO 1.0.0</VersionApp>
              <LogoArea source={require('../../assets/logo_app.png')}/>
              <Content>
                  <Input
                    placeholder=''
                    onChangeText={text=>setUser(text)}
                    leftIcon={{ type: 'font-awesome', name: 'user', color:'#11552c'}}
                    style={{color:'#000', paddingLeft:15, paddingRight:15, borderBottomColor:'#11552c'}}
                  />
                  <Input
                    placeholder=''
                    secureTextEntry={true} 
                    onChangeText={text=>setPass(text)}
                    leftIcon={{ type: 'font-awesome', name: 'lock', color:'#11552c'}}
                    style={{color:'#000', paddingLeft:15, paddingRight:15, borderBottomColor:'#11552c'}}
                  />
                  <Picker/>
                  <ConfirmBtn onPress={login}>
                      {isLoading &&
                        <ActivityIndicator size="small" color="#fff"/>
                      }
                      {!isLoading &&
                        <LabelBtn>LOGIN</LabelBtn>
                      }
                  </ConfirmBtn>
              </Content>
              <Footer>
                      <LogoFutura source={require('../../assets/logo_futura.png')}/>
              </Footer>
          </Container>
          <SnackbarMessage label="Fechar" messege={warningMessage}/>
      </KeyboardAvoidingView>
    );
}