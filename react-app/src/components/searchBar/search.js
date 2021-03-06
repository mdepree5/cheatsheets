import React from 'react'
import { getSearchResults } from '../../store/search'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './search.css'
const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ keyword, setKeyword ] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(getSearchResults(keyword));
      history.push(`/search/${keyword}`);
      setKeyword('')
    }


  return (
    <form className='search_form'>
      <input type="text" className='search_input' placeholder='Teach me how to...'
        value={keyword} onChange={e => setKeyword(e.target.value)} />
      <button className='search-btn' onClick={handleSubmit}>Search</button>
    </form>
  )
}

export default SearchBar;
