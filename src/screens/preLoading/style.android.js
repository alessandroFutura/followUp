import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;
export const LogoApp = styled.Image`
    width: 175px;
    height: 80px
    align-items: center;
    justify-content: center;
    margin: -70px 0px 20px 0px;
`;
export const Loading = styled.View`
    bottom: 20px;
    position: absolute;
`;
export const LabelLoading = styled.Text`
    color: gray;
    font-size: 12px;
    margin-top: 10px;
`;
export const Version = styled.Text`
    top: 50px;
    color: gray;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
`;