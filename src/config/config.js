import AsyncStorage from '@react-native-async-storage/async-storage';

export const environment = async ()=>{
    try {
        const value = await AsyncStorage.getItem('conn');
        if(value !== null){
            const data = JSON.parse(value);            
            return data.ip
        }
    } catch(e) {
        console.error(e);
    }
}
