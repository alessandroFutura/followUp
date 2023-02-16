import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useData } from "../../hooks/data";
import Style from './style';

export default function selectPicker(){
    const { accessConfig, setAccessConfig, currentConn, setCurrentConn} = useData();
    const [selectedValue, setSelectedValue] = useState(currentConn.ip);

    function changeValue(value){
        setSelectedValue(value);
        accessConfig.map((data, key)=>{
            if(data.ip == value){
                setConn(data);
                setCurrentConn(data);
            }
         });
    }

    async function setConn(data){
        try {
            await AsyncStorage.setItem('conn', JSON.stringify(data));
        } catch(e) {
            console.error(e);
        }
    }

    return(
        <View style={Style.selectContainer}>
            <FontAwesome5 style={{marginLeft: 8}} name="server" size={16} color="#11552c" />
            <Picker
                mode={'dropdown'}
                style={Style.picker}
                dropdownIconColor={'gray'}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => changeValue(itemValue)}
            >
            {
                accessConfig.map((data, key)=>{
                   return <Picker.Item  key={key} style={Style.item} label={data.name} value={data.ip} />
                })
            }
            </Picker>
        </View>
    );
}