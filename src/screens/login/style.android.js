import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    background-color: #11552c;
`;

export const VersionApp = styled.Text`
    color: #fff;
    font-weight: bold;
    margin: 30px 0px;
`;

export const LogoArea = styled.Image`
`;

export const Content = styled.View`
    width: 100%;
    height: 50%;
    padding: 0px 35px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;

export const ConfirmBtn = styled.TouchableOpacity`
    width: 60%;
    height: 45px;
    margin-top: 20px;
    border-radius: 2px;
    align-items: center;
    background: #11552c;
    justify-content: center;
`;

export const LabelBtn = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const Footer = styled.View`
    width: 100%
    height: 70px;
    padding: 4px 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const LogoFutura = styled.Image`
    width: 120px
    height: 40px;
`;