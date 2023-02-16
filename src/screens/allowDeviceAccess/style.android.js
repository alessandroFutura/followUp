import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: #11552c;
`;

export const Logo = styled.Image`
    align-items: center;
    justify-content: center;
`;

export const VersionApp = styled.Text`
    color: #fff;
    font-weight: bold;
    margin: 30px 0px;
`;

export const Panel = styled.View`
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    width: ${windowWidth <= 500 ? '75%' : '25%'};   
`;

export const ConfirmBtn = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin-top: 20px;
    border-radius: 2px;
    align-items: center;
    background: #4caf50;
    justify-content: center;
`;

export const LabelBtn = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const Footer = styled.View`
    width: 100%
    bottom: 0px;
    height: 20%;
    padding: 4px 8px;
    background: #fff;
    position: absolute;
    align-items: center;
    justify-content: center;
`;

export const LogoFutura = styled.Image`
    width: 120px
    height: 40px;
`;