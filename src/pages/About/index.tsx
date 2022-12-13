import React, {useEffect, useState} from "react";
import * as S from './styles';
import {useNavigation, useRoute} from "@react-navigation/native";
import api from "../../services/api";
import {useTheme} from "styled-components";
import {Feather} from "@expo/vector-icons";
import circle from '../../assets/img/circle.png';
import dots from '../../assets/img/dots.png';
import {ScrollView, Text} from "react-native";
import {FadeAnimation} from "../../components/FadeAnimation";

type RouteParams = {
    idPokemon: number;
}

type PokemonProps = {
    stats: Stats[];
    abilities: Abilities[];
    id: number;
    name: string;
    types: Types[];
    color: string;
}

type Abilities = {
    ability: {
        name: string;
    }
}

type Types = {
    type: {
        name:
            | 'grass'
            | 'fire'
            | 'water'
            | 'poison'
            | 'normal'
            | 'bug'
            | 'flying'
            | 'eletric'
            | 'ground'
    }
}

type Stats = {
    base_stat: number;
    stat: {
        name: string;
    }
}

export function About () {
    const route = useRoute();
    const navigation = useNavigation();
    const { colors } = useTheme();
    const { idPokemon } = route.params as RouteParams;
    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        async function getPokemonDetail() {
            try {
                const response = await api.get(`/pokemon/${idPokemon}`);
                const { stats, abilities, id, name, types } = response.data;

                const currentType = types[0].type.name;
                const color = colors.backgroundCard[currentType];

                setPokemon({stats, abilities, id, name, types, color});
                setLoad(false);
            } catch (err) {

            } finally {
                setLoad(false);
            }
        }

        getPokemonDetail();
    }, [])


    return <>
    {load ? <Text> Carregando... </Text> :
        <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
            <S.Header type={pokemon.types[0].type.name}>
                <S.BackButtom onPress={() => navigation.goBack()}>
                    <Feather name={"chevron-left"} size={24} color={"#FFF"} />
                </S.BackButtom>
                <S.ContentImage>
                    <S.CircleImage source={circle} />
                    <FadeAnimation>
                        <S.PokemonImage source={{
                            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                        }} />
                    </FadeAnimation>
                </S.ContentImage>

                <S.Content>
                    <S.PokemonId>
                        #{pokemon.id}
                    </S.PokemonId>

                    <S.PokemonName>
                        {pokemon.name}
                    </S.PokemonName>
                    <S.PokemonTypeContainer>
                        {
                            pokemon.types.map(({type}) =>
                                <S.PokemonType type={type.name} key={type.name}>
                                    <S.PokemonTypeText>
                                        {type.name}
                                    </S.PokemonTypeText>
                                </S.PokemonType>
                            )
                        }
                    </S.PokemonTypeContainer>
                </S.Content>
                <S.DotsImage source={dots}/>
            </S.Header>
            <S.Container>
                <S.Title type={pokemon.types[0].type.name}>
                    Base Stats:
                </S.Title>

                {
                    pokemon.stats.map(att =>
                        <S.StatsBar key={att.stat.name}>
                            <S.Attributes>
                                {att.stat.name}
                            </S.Attributes>
                            <S.AttributesValue>
                                {att.base_stat}
                            </S.AttributesValue>
                            <S.ContentBar>
                                <S.ProgressBar
                                    type={pokemon.types[0].type.name}
                                    borderWidth={0}
                                    progress={100}
                                    width={att.base_stat}
                                    color={pokemon.color}
                                />
                            </S.ContentBar>
                        </S.StatsBar>
                    )
                }
                
                <S.Title type={pokemon.types[0].type.name}>
                    Abilities
                </S.Title>

                {
                    pokemon.abilities.map(current => <S.Ability>
                        {current.ability.name}
                    </S.Ability>
                    )
                }
            </S.Container>
        </ScrollView>
    }
    </>
}