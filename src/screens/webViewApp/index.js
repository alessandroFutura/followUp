import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import { useData } from "../../hooks/data";
import Api from '../../services/api';

export default function App() {
  const { device, setWebview, accessIp } = useData();
  const navigation = useNavigation();

  const logout = ()=>{
      navigation.reset({
          index:0,
          routes:[{name:"Login"}]
      });
      Api.logout();
  }

  return (
      <SafeAreaView style={{ flex: 1}}>
          <WebView
              cacheEnabled={true}
              javaScriptEnabled={true}
              source={{uri: `http:/${accessIp}/mobile.webview/`}} 
              injectedJavaScript={`DeviceNative = ${JSON.stringify(device)}`}
              onError={()=>{navigation.navigate('errorPage')}}
              onMessage={(event)=>{
                if(event.nativeEvent.data == 'logout'){
                  logout();
                }
              }}
              ref={(webview)=>{ setWebview(webview)}}
          />
      </SafeAreaView>
  );
}

