'use client';

import { Pokemon } from '@/type/type';
import getData from './../http/http';
import { useEffect, useState } from "react";
import Image from 'next/image';
import getColorByType from './../util/ColorByType';
import {Sigmar_One } from "next/font/google";
import { Nunito } from 'next/font/google'


const roboto = Sigmar_One({
  weight: '400',
  subsets: ['latin'],
})

const nunito = Nunito({ subsets: ['latin'] })



export default function Home() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=16&offset=0';
  const [pokedata, setPokeData] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemonData();
  }, []);

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
      }
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémons:", error);
    }
  };

  return (
    <>
    <header className={`${roboto.className} border-b border-gray-800 shadow-sm`}>
        <div className='mx-auto container py-4'>
        <h1 className=' text-2xl text-yellow-400'>POKEMON</h1>

        </div>
    </header>
      <section className={`${nunito.className} container mx-auto `} >
      <div className='grid grid-cols-1 px-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:p-0 gap-7 my-7'>
      {pokedata.map((item, index) => (
        <div key={index}
        
        className='shadow-xl rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-[#1f1f3d] z-10'> 
            <div className="text-center text-white border border-gray-700 rounded" >
              <div style={{ backgroundColor: getColorByType(item.types[0].type.name) }} className='flex justify-between items-center px-2 '>
              <h2 className='capitalize font-bold text-lg '>{item.name}</h2>
              

                  <div className='font-extrabold'>
                    <span className='text-xs italic'>hp</span>
                    
                    <span className='text-lg italic'> {item.stats.find(cc => cc.stat.name === "hp")?.base_stat ?? 'N/A'}</span>
                    </div>
                

              </div>
              <Image
              className='mx-auto'
              src={item.sprites?.other?.['official-artwork'].front_default|| '/path/to/default/image.png'}
              width={250}
              height={250 }
              alt="Picture of the author"
              />

              
          <div className='bg-[#242233] py-2 '>
         
              poder
         
      
          </div>
          <div className='bg-[#242233] py-2 '>
         
              fraqueza
         
      
          </div>

          <div className='bg-[#242233] py-2 '>
         
              poder
         
      
          </div>
          <div className='bg-[#242233] py-2 '>
         
         caracteristicas
    
 
     </div>

           
         </div>

       
          
         
        </div>
      ))}
    </div>
    </section>
    </>
  );
}
