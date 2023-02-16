import {StyleSheet } from 'react-native';

const style = StyleSheet.create({
    selectContainer:{
        height: 40, 
        width: '100%',
        marginTop: 15,
        borderRadius: 7, 
        flexDirection:'row',
        alignItems: 'center', 
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        justifyContent: 'space-between', 
    },
    picker:{ 
        height: 40, 
        padding: 0, 
        width: '95%' 
    }
});

export default style;