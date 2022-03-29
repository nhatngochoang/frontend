import React, { useState, useEffect } from 'react';
import { DetailState } from '../index';

export interface PokemonListProps {
   detail: DetailState;
   setDetail: React.Dispatch<React.SetStateAction<DetailState>>;
   abilities:
      | {
           name: string;
           ability: string;
        }[]
      | undefined;
   name: string;
   id: number;
   image: string;
}

export default function PokemonList(props: PokemonListProps) {
   const { name, id, image, abilities, detail, setDetail } = props;
   const [isSelected, setIsSelected] = useState(false);

   useEffect(() => {
      setIsSelected(id === detail.id);
   }, [detail.id, id]);

   const closeDetail = () => {
      setDetail({
         id: 0,
         isOpened: false,
      });
   };
   return (
      <div>
         {isSelected ? (
            <section className="pokemon-list-detailed">
               <div className="detail-container">
                  <p className="detail-close" onClick={closeDetail}>
                     X
                  </p>
                  <div className="detail-info">
                     <img src={image} alt="pokemon" className="detail-img" />
                     <p className="detail-name"> {name}</p>
                  </div>
                  <div className="detail-skill">
                     <p className="detail-ability"> Ablities: </p>
                     {abilities?.map((ab: any) => {
                        return <div key={ab.ability.name}> {ab.ability.name}</div>;
                     })}
                  </div>
               </div>
            </section>
         ) : (
            <section className="pokemon-list-container">
               <p className="pokemon-name"> {name} </p>
               <img src={image} alt="pokemon" />
            </section>
         )}
      </div>
   );
}
