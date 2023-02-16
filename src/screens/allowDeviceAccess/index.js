import React, {useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import base64 from 'react-native-base64';
import * as Device from 'expo-device';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Input } from "@rneui/themed";
import Modal from '../../components/Modal';
import Picker from '../../components/Picker';
import SnackbarMessage from '../../components/SnackBar';
import { useData } from "../../hooks/data";
import Api from '../../services/api';

import {
    Logo,
    Panel,
    Footer,
    LabelBtn,
    Container, 
    ConfirmBtn,
    VersionApp,
    LogoFutura
} from './style.android';

export default ()=>{
  const navigation = useNavigation();
  const { setModalShow, currentConn, setVisibleSnackbar } = useData();
  const [login, setLogin] = useState(null);
  const [password, setPass] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);
  
  function generateDeviceToken() {
    let key = (Math.random() * (24 - 0) + 24).toString();
    return base64.encode(key);
  }
  const saveLocalTokenDevice = async (device_guid) => {
    await AsyncStorage.setItem('@device_Key', device_guid)
  }
  const registerDevice = ()=>{
    let data = {
      user_user: login,
      user_pass: password,
      device_guid: generateDeviceToken(),
      device_device: Device.deviceName,
      device_model: Device.modelName,
      device_brand: Device.brand,
    }
    setLoading(true);
    Api.register(data)
      .then((response) => {
          if(response.status.code == '200'){
              navigation.reset({
                  index:0,
                  routes:[{name:"Login"}]
              });
              saveLocalTokenDevice(data.device_guid);
              setLoading(false);
          } else {
            setLoading(false);
              setVisibleSnackbar(true);
              setWarningMessage(response.status.description);
          }
      })
      .catch((response) => {})
  }
  const validateFields = ()=>{
    if(!login || !password){
      setVisibleSnackbar(true);
      setWarningMessage('Usuário ou senha não informados!');
      setLoading(false);
    } else{
      registerDevice();
    }
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex:1}}
    >
        <Container>
            <VersionApp>VERSÃO 1.0.0</VersionApp>
            <Logo source={require('../../assets/image_block.png')}/>
            <Panel>
                <Input
                  placeholder=''
                  onChangeText={text=>setLogin(text)}
                  leftIcon={{ type: 'font-awesome', name: 'user', color:'#fff'}}
                  style={{color:'#fff', paddingLeft:15, paddingRight:15, borderBottomColor:'#fff'}}
                />
                <Input
                  placeholder=''
                  secureTextEntry={true} 
                  onChangeText={text=>setPass(text)}
                  leftIcon={{ type: 'font-awesome', name: 'unlock-alt', color:'#fff'}}
                  style={{color:'#fff', paddingLeft:15, paddingRight:15, borderBottomColor:'#fff'}}
                />
                <Picker/>
              <ConfirmBtn  onPress={()=>validateFields()}>
                {isLoading &&
                  <ActivityIndicator size="small" color="#fff"/>
                }
                {!isLoading &&
                  <LabelBtn><MaterialCommunityIcons name="key-variant" size={22} color="#fff" /> LIBERAR</LabelBtn>
                }
              </ConfirmBtn>
            </Panel>
            <Footer>
                <LogoFutura source={require('../../assets/logo1.png')}/>
            </Footer>
        </Container>
    </KeyboardAvoidingView>
  );
}