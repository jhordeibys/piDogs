import { useState } from 'react';

const SearchBar = ({onSearch}) => {

  const [name, setName] = useState('');

  const handleChange = (event)=>{
    setName(event.target.value)
  };

  return (

    <div className='SearchBar'>
      
      <input type='search' value= {name} onChange={handleChange}/> 

      <button onClick={()=>onSearch(name)}> SEARCH </button>

    </div>
  )
}

export default SearchBar;