import React, { createContext, useContext, useState, useEffect} from "react";
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServiceApi from '../services/api';
import * as Network from 'expo-network';

const DataContext = createContext({});
export const DataProvider = ({ children })=>{
    const [ token, setToken ] = useState(null); 
    const [ device, setDevice ] = useState(null);
    const [ webview, setWebview ] = useState(null);
    const [ modalShow, setModalShow ] = useState(false);
    const [ accessConfig, setAccessConfig ] = useState([]);
    const [ currentConn, setCurrentConn ] = useState({});
    const [ linkDefault, setLinkDefault ] = useState();
    const [ visibleSnackbar, setVisibleSnackbar ] = useState(false);
    const [ accessIp, setAccessIp ] = useState(null);
    const [ networkStatus, setNetworkStatus ] = useState(false);

    useEffect(()=>{
        getToken();
        getAccess();
    },[]);

    useEffect(()=>{
        getCurrentConn();
    },[linkDefault]);

    useEffect(()=>{
        getInfoDevice();
    },[token]);

    useEffect(()=>{
        getCurrentConn();
    },[currentConn]);

    const getToken = async()=>{
        const value = await AsyncStorage.getItem('@device_Key')
        setToken(value);
    }

    const getInfoDevice = ()=>{
        let data = {
            device_device: Device.deviceName,
            device_model: Device.modelName,
            device_brand: Device.brand,
            platform: Platform.OS,
            version: '1.18.16',
            device_guid:token,
          }
          setDevice(data);
    }

    const getCurrentConn = async ()=>{
        try {
            const value = await AsyncStorage.getItem('conn');
            if(value !== null){
                const data = JSON.parse(value);
                setCurrentConn(data);
                setAccessIp(data.ip);
            }
            
        } catch(e) {
            console.error(e);
        }
    }

    const getAccess = async () => {

        ServiceApi.currentAccess()
        .then((response) => {
            setAccessConfig(response);
            response.map((resp)=>{
                if(resp.default == 'Y'){
                    setLinkDefault(resp);
                    setConn(resp)
                }
            });
        })
        .catch((response) => {})
    }

    const setConn = async (data)=>{
        try{
            const value = await AsyncStorage.getItem('conn');
            if(value == null){
                try {
                    await AsyncStorage.setItem('conn', JSON.stringify(data));
                    getCurrentConn();
                } catch(e) {
                    console.error(e);
                }
            }
        } catch(e){console.error(e)}
    }
    
    return(
        <DataContext.Provider value={{device, networkStatus, webview, setWebview, modalShow, setModalShow, accessConfig, setAccessConfig, currentConn, setCurrentConn, visibleSnackbar, setVisibleSnackbar, accessIp}}>
            { children }
        </DataContext.Provider>
    );
}

export const useData = ()=>{
    const context = useContext(DataContext);
    if(!context) throw new Error('use into of Data Context')
    return context;
}