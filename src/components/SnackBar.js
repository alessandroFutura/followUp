import React from 'react';
import {Text} from 'react-native';
import { Snackbar, } from 'react-native-paper';
import { useData } from "../hooks/data";

const SnackbarMessage = ({label, messege}) => {
    const { visibleSnackbar, setVisibleSnackbar } = useData();

    return <Snackbar
        visible={visibleSnackbar}
        duration={2000}
        onDismiss={()=>{}}
        style={{
            backgroundColor: '#fff',
        }}
        action={{
            label: label,
            labelStyle:{
                margin: 0,
                color: '#fff',
                paddingTop: 4, 
                borderRadius: 4,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 4,
                backgroundColor: '#263238',
            },
            onPress: () => {
                setVisibleSnackbar(false);
            },
        }}
        >
            <Text style={{ color: '#000', fontWeight: 'bold'}}>
                {messege}
            </Text>
    </Snackbar>;
}

export default SnackbarMessage;