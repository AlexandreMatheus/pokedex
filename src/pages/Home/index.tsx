import React, {useEffect, useState} from "react";
import * as S from './styles';
import api from "../../services/api";
import {Card, Pokemon, PokemonType} from '../../components/Card';
import {FlatList} from "react-native";
import pokeballHeader from '../../assets/img/pokeball.png'
import {useNavigation} from "@react-navigation/native";

type Request = {
    id: number;
    types: PokemonType[];
}

export function Home() {
    const {navigate} = useNavigation();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    function handleNavigation(idPokemon: number) {
        // @ts-ignore
        navigate('About', {idPokemon});
    }

    useEffect(() => {
        async function getAllPokemons() {
            const response = await api.get('/pokemon');
            const { results } = response.data;

            const payloadPokemons = await Promise.all(
                results.map(async (poke: Pokemon) => {
                    const {id, types} = await getMoreInfo(poke.url)
                    return {name: poke.name, id, types}
                })
            )

            setPokemons(payloadPokemons);
        }

        getAllPokemons();

    }, []);

    async function getMoreInfo (url: string): Promise<Request> {
        const response = await api.get(url);
        const {id, types} = response.data;

        return { id, types };
    }

    return <S.Container>
        <FlatList
            ListHeaderComponent={<>
                <S.Header source={pokeballHeader} />
                <S.Title>
                    Pokédex
                </S.Title>
            </>}
            contentContainerStyle={{
                paddingHorizontal: 20
            }}
            data={pokemons}
            keyExtractor={pokemon => pokemon.id.toString()}
            renderItem={({item: pokemon}) => (
                <Card data={pokemon} onPress={() => handleNavigation(pokemon.id)}/>
            )}
        />
    </S.Container>
}