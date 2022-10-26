import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardPoke from '../components/pokedex/CardPoke'
import InputSearch from '../components/pokedex/InputSearch'
import Pagination from '../components/pokedex/Pagination'
import SelectByType from '../components/pokedex/SelectByType'
import '../components/pokedex/styles/pokedex.css'

const Pokedex = () => {
  const [pokemons, setPokemons] = useState()
  const [typeSelected, setTypeSelected] = useState('All Pokemons')
  useEffect(() => {
    //si se selcciono un tipo
    if (typeSelected !== 'All Pokemons') {
      axios.get(typeSelected)
        .then(res => {
          const result = res.data.pokemon.map(e => e.pokemon)
          setPokemons(result)
        })
        .catch(err => console.log(err))
    } else {
      // si queremos toods los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  }, [typeSelected])
  const userName = useSelector(state => state.userName)

  // logica de paginacion***************  
  const [page, setPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(12)
  const initialPoke = (page - 1) * pokePerPage
  const finalPoke = page * pokePerPage





  return (
    <div calssName='card_card'>
      <header className='card_header'>

        <img className='card_title' src="/images/home/image 11.png" alt="" />
        <p className='card_subtitle'>Welcome <span className='card_span'>{userName}</span>, here you can find your favorite pokemon.</p>
      </header>

      <aside className='card_aside'>
        <div className='card_input'> <InputSearch /> </div>
        <div className='card_selectBy'><SelectByType setTypeSelected={setTypeSelected} setPage={setPage} /> </div>
        <Pagination
          page={page}
          pagesLength={pokemons && Math.ceil(pokemons.length / pokePerPage)}
          setPage={setPage}
          />
          </aside>
      <main>
        <div className='card_container'>
          {
            pokemons?.slice(initialPoke, finalPoke).map(pokemon => (
              <CardPoke
                key={pokemon.url}
                url={pokemon.url}
              />
            ))
          }
        </div>
      </main>
      <Pagination
        page={page}
        pagesLength={pokemons && Math.ceil(pokemons.length / pokePerPage)}
        setPage={setPage}
      />
    </div>
  )
}
export default Pokedex