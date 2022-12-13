import React from "react";
import * as S from './styles';
import dotsImages from '../../assets/img/dots.png';
import {TouchableOpacityProps} from "react-native";
import pokeball from '../../assets/img/pokeballCard.png';
import {FadeAnimation} from "../FadeAnimation";

export type Pokemon = {
    name: string;
    url: string;
    id: number;
    types: PokemonType[]
}

export type PokemonType = {
    type: { name: string };
}

type Props = {
    data: Pokemon;
} & TouchableOpacityProps

export function Card({data, ...rest}: Props) {
    return <S.PokemonCard type={data.types[0].type.name} {...rest} >

        <S.LeftSide>
            <S.PokemonId>
                #{data.id}
            </S.PokemonId>
            <S.PokemonName>
                {data.name}
            </S.PokemonName>
            <S.ImageCardDetailLeftSide source={dotsImages}>

            </S.ImageCardDetailLeftSide>
            <S.PokemonContentType>
                {data.types.map(pokemonTypes =>
                    <S.PokemonType type={pokemonTypes.type.name} key={pokemonTypes.type.name}>
                        <S.PokemonTypeText key={pokemonTypes.type.name}>
                            {pokemonTypes.type.name}
                        </S.PokemonTypeText>
                    </S.PokemonType>
                )}

            </S.PokemonContentType>
        </S.LeftSide>

        <S.RightSide>
            <S.PokeballImage source={pokeball} />
            <FadeAnimation>
                <S.PokemonImage source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}} />
            </FadeAnimation>
        </S.RightSide>

    </S.PokemonCard>
}