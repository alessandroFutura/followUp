import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Loading,
    LogoApp, 
    Version,
    Container,
    LabelLoading
} from './style.android';

import ServiceApi from '../../services/api';
import {useData} from '../../hooks/data';

export default function preLoading(){
    const navigation = useNavigation();
    const {currentConn, setCurrentConn} = useData();
    const [connValueTemp, setConnValueTemp] = useState({
        "default": "Y",
        "ip": "201.33.174.154",
        "name": "k2",
    });

    const validateDevice = async () => {
        try {
            const value = await AsyncStorage.getItem('@device_Key')
            if(value !== null) {
                validateToken(value);
            } else {
                setTimeout(()=>{
                    navigation.reset({
                        index:0,
                        routes:[{name:"allowAccess"}]
                    });
                },3000);
            }
        } catch(e) {}
    };
    const validateToken = (device_guid)=>{ 
        ServiceApi.validate({device_guid: device_guid})
        .then((response) => {
            if(response.status.code == '200'){
                setTimeout(() => {
                    navigation.reset({
                        index:0,
                        routes:[{name:"Login"}]
                    });
                }, 3000);
            }else {
                navigation.reset({
                    index:0,
                    routes:[{name:"allowAccess"}]
                });
            }
        })
        .catch((response) => { 
        });
    };
    const getIPS = ()=>{
        fetch('https://www.grupodafel.com.br/YQXMxHBR5p.json')
                .then((response) => response.json())
                .then((json) => {
                    json.map((ret)=>{
                        if(ret.default == 'Y'){
                            setConnValueTemp(ret);
                        }
                    });
                });
    }
    const setConnValueDefault = async ()=>{
        try {
            await AsyncStorage.setItem('conn', JSON.stringify(connValueTemp));
            setCurrentConn(connValueTemp)
            validateDevice();
        } catch(e) {
            console.error(e);
        }
    }
    useEffect(()=>{    
        getIPS(); 
        validateDevice();
    },[]);

    return(
        <Container>
                <Version>VERSÃO 1.0.0</Version>
                <LogoApp source={require('../../assets/loader.png')}></LogoApp>
                <Loading> 
                    <ActivityIndicator size="small" color="#2d8659" />
                    <LabelLoading>CARREGANDO CONFIGURAÇÔES</LabelLoading>
                </Loading>
        </Container>
    );
}

