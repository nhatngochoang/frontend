import React from 'react';
import { PokemonDetail } from '../interface';
import PokemonList from './PokemonList';
import { DetailState } from '../index';

interface Props {
   pokemons: PokemonDetail[];
   detail: DetailState;
   setDetail: React.Dispatch<React.SetStateAction<DetailState>>;
}
const PokemonColection: React.FC<Props> = (props) => {
   const { pokemons, detail, setDetail } = props;

   const selectPokemon = (id: number) => {
      if (!detail.isOpened) {
         setDetail({
            id,
            isOpened: true,
         });
      }
   };
   return (
      <>
         <section
            className={detail.isOpened ? 'collection-container-active' : 'collection-container'}
         >
            {detail.isOpened ? <div className="overlay"></div> : <div className=""></div>}
            {pokemons.map((pokemon) => {
               return (
                  <div
                     className="pokemons"
                     key={pokemon.id}
                     onClick={() => selectPokemon(pokemon.id)}
                  >
                     <PokemonList
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.sprites.front_default}
                        abilities={pokemon.abilities}
                        detail={detail}
                        setDetail={setDetail}
                     />
                  </div>
               );
            })}
         </section>
      </>
   );
};

export default PokemonColection;
