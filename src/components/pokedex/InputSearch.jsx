import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/inputSearch.css';
const InputSearch = () => {

    const navigate = useNavigate()

    const submit = e => {
        e.preventDefault()
        navigate(`/pokedex/${e.target.search.value.trim().toLowerCase()}`)
    }


    return (
        <form className="search-box" onSubmit={submit}>

                <input id='search' className="search-txt" placeholder="Search..." />

                <button className="search-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>

           
        </form>
    )
}

export default InputSearch