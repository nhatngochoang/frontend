import React, { useState, useEffect } from 'react';
import './index.css';
import { Pokemon } from './interface';
import axios from 'axios';
import PokemonColection from './components/PokemonColection';

export interface PokemonProps {}

interface Pokemons {
   name: string;
   url: string;
}

export interface DetailState {
   id: number;
   isOpened: boolean;
}

export default function App(props: PokemonProps) {
   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
   const [nextUrl, setNextUrl] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(true);
   const [detail, setDetail] = useState<DetailState>({
      id: 0,
      isOpened: false,
   });

   useEffect(() => {
      const getPokemon = async () => {
         const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10'); // res.data.results ➤ [{name, url}] ➤ Pokemons
         setNextUrl(res.data.next);
         // loop
         res.data.results.forEach(async (pokemon: Pokemons) => {
            const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            setPokemons((p) => [...p, poke.data]);
            setLoading(false);
         });
      };
      getPokemon();
   }, []);

   const nextPokemon = async () => {
      setLoading(true);

      let res = await axios.get(nextUrl);
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
         const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
         setPokemons((p) => [...p, poke.data]);
         setLoading(false);
      });
   };

   return (
      <div className="pokemon-container">
         <header className="pokemon-header">Pokemon</header>
         <PokemonColection pokemons={pokemons} detail={detail} setDetail={setDetail} />
         {!detail.isOpened && (
            <div className="btn">
               <button onClick={nextPokemon} className="pokemon-button">
                  {loading ? 'Loading...' : 'Load more'}{' '}
               </button>
            </div>
         )}
      </div>
   );
}
