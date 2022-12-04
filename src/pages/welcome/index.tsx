import React from "react";
import * as S from './styles';
import pokemonAnimation from './pokemon.json';
import AnimatedLottieView from "lottie-react-native";
import { Buttom } from "../../components/Buttom";

export function Welcome() {
    return <S.Container>
        <S.Content>
            <S.WrapperAnimation>
                <S.WrapperImage>
                    <AnimatedLottieView style={{width: 200}} autoPlay source={pokemonAnimation} loop />
                </S.WrapperImage>
            </S.WrapperAnimation>

            <S.Title>Bem Vindo</S.Title>
            <S.Subtitle>Encontre todos os pokemons em um só lugar</S.Subtitle>
        </S.Content>
        <S.Footer>
            <Buttom title={'Iniciar'}/>
        </S.Footer>
    </S.Container>
}