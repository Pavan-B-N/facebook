import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
export default function Search() {
  return (
    <div className='searchContainer'>
        <SearchIcon className='searchIcon' />
      <input type="text" placeholder='Search..' className='searchinput' />
    </div>
  )
}
