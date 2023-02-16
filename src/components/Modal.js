import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Modal, RadioButton } from 'react-native-paper';
import { useData } from "../hooks/data";
import AsyncStorage from '@react-native-async-storage/async-storage';

 const ModalApp = () => {
    
    const [value, setValue] = useState(currentConn);
    const [previousState, setPreviousState] = useState(currentConn);

    useEffect(()=>{
        setCurrentConn(value)
    },[value]);

    const setConn = async()=>{
        try {
            await AsyncStorage.setItem('conn', JSON.stringify(value));
            setModalShow(false);
        } catch(e) {
            console.error(e);
        }

    }
    const restorePreviousState = ()=>{
        setModalShow(false);
        setCurrentConn(previousState);
    }
    return<Modal visible={modalShow} onDismiss={()=>{restorePreviousState()}} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Conexões</Text>
            <ScrollView style={styles.viewList}>
            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>                     
            {
                accessConfig.map((data, key)=>{
                   return <RadioButton.Item
                        key={key}
                        label={`Acesso: ${data.name}`}
                        value={data} 
                        color='#9ABED2' 
                        uncheckedColor='#fff' 
                        labelStyle={{
                            color:'#9ABED2', 
                            fontWeight:'bold', 
                            fontSize:20
                        }}
                    />
                })
            }
            </RadioButton.Group>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={()=>{setConn();}}>
                <Text style={styles.label}>Aplicar</Text>
            </TouchableOpacity>
        </Modal>;
}

const styles = StyleSheet.create({
    container:{
        padding: 5, 
        margin: 20, 
        height:'50%',
        alignItems: 'center',
        backgroundColor: '#0f2330',
    },
    title:{
        color:'#fff',
        fontSize: 18,
        marginTop: 15,
        marginBottom:10,
        fontWeight:'bold', 
    }, 
    button:{
        backgroundColor: '#9ABED2',
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:18,
        paddingRight:18,
        borderRadius: 4,
        marginBottom:10
    },
    label:{
        color: '#0f2330',
        fontSize:15
    },
    viewList:{
        width:'100%',
        marginBottom:15      
    }    
});

export default ModalApp