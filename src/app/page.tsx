'use client';

import { Pokemon } from '@/type/type';
import getData from './../http/http';
import { useEffect, useState } from "react";
import Image from 'next/image';
import getColorByType from './../util/ColorByType';
import { Sigmar_One } from "next/font/google";
import { Nunito } from 'next/font/google';

const roboto = Sigmar_One({
  weight: '400',
  subsets: ['latin'],
});

const nunito = Nunito({ subsets: ['latin'] });

export default function Home() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=16&offset=0';
  const [pokedata, setPokeData] = useState<Pokemon[]>([]);
  const [descriptions, setDescriptions] = useState<Record<number, string>>({}); // Estado para descrições

  useEffect(() => {
    fetchPokemonData();
  }, []);

  // Busca os dados dos Pokémon
  const fetchPokemonData = async () => {
    try {
      const res = await getData(url);

      if (res && res.results) {
        const detailedPokemonData = await Promise.all(
          res.results.map(async (element: { url: string }) => {
            const pokemonDetail = await getData(element.url);
            return pokemonDetail;
          })
        );

        setPokeData(detailedPokemonData);

        // Busca descrições de todos os Pokémon
        fetchAllDescriptions(detailedPokemonData);
      }
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémon's:", error);
    }
  };

  // Busca as descrições para todos os Pokémon
const fetchAllDescriptions = async (pokemonData: Pokemon[]) => {
  const descriptionsArray: string[] = []; // Usando um array para armazenar as descrições

  await Promise.all(
    pokemonData.map(async (pokemon) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);
        const speciesData = await response.json();
        const description = speciesData.flavor_text_entries.find((entry: { language: { name: string }; flavor_text: string }) => entry.language.name === 'en')?.flavor_text || 'Descrição não disponível.';
        descriptionsArray[pokemon.id] = description; // Armazena a descrição no índice correspondente ao ID
      } catch (error) {
        console.error(`Erro ao buscar descrição para Pokémon ${pokemon.name}: ${(error as Error).message}`);
        descriptionsArray[pokemon.id] = 'Erro ao buscar descrição.'; // Insere mensagem de erro no índice
      }
    })
  );

  setDescriptions(descriptionsArray); // Atualiza o estado com o array de descrições
};


  return (
    <>
      <header className={`${roboto.className} border-b border-gray-800 shadow-sm`}>
        <div className="mx-auto container py-4">
          <h1 className="text-2xl text-yellow-400">POKEMON</h1>
        </div>
      </header>
      <section className={`${nunito.className} container mx-auto`}>
        <div className="grid grid-cols-1 px-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:p-0 gap-7 my-7">
          {pokedata.map((item, index) => (
            <div
              key={index}
              className="shadow-xl rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-[#1f1f3d]"
            >
              <div className={`text-center border border-gray-700 rounded relative h-full }`}>
                <div
                  style={{ backgroundColor: getColorByType(item.types[0].type.name) }}
                  className={`flex justify-between items-center px-2 text-${item.types[0].type.name === 'normal' ? 'black' : 'white'}`}
                >
                  <h2 className={`capitalize font-bold text-lg `}>{item.name}</h2>
                  <div className="font-extrabold text-inherit">
                    <span className="text-xs italic">hp{' '}</span>
                    <span className="text-lg italic">
                      {item.stats.find((cc) => cc.stat.name === 'hp')?.base_stat ?? 'N/A'}
                    </span>
                  </div>
                </div>
                <Image
                  className="mx-auto"
                  src={item.sprites?.other?.['official-artwork'].front_default || '/path/to/default/image.png'}
                  width={250}
                  height={250}
                  alt={`Imagem do Pokémon ${item.name}`}
                />
                                  <span className='text-sm text-white font-extrabold italic absolute right-4 bottom-2'>#{item.id}</span>

                <div className="bg-[#242233] min-h-52 text-white  flex-grow flex flex-col">
                  {/* Exibe a descrição do Pokémon */}
                  <span className='flex-grow break-words px-2 pt-2 font-semibold'>{descriptions[item.id] || 'Carregando descrição...'}</span>
                
                  <span className=" ">fraqueza</span>
                  <span className=" ">poder</span>
                  <span className=" ">características</span>
                </div>  
               
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
