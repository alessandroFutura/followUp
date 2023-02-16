import styled from "styled-components";

export const Container = styled.View`
    flex: 1;
    padding: 15px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;

export const Image = styled.Image`
    width: 80%; 
    height: 200px;
`;

export const ButtomReload = styled.TouchableOpacity`
    width: 60%;
    height: 40px;
    bottom: 60px;
    position: absolute;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    background-color: #006064;
`;

export const ButtomLogout = styled.TouchableOpacity`
    width: 60%;
    height: 40px;
    bottom: 10px;
    position: absolute;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    background-color: #512da8;
`;

export const Label = styled.Text`
    color: #fff;
    font-weight: bold;
`;

export const Title = styled.Text`
    color: #000;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`;