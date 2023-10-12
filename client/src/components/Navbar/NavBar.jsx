import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './NavBarStyle.css';



const NavBar = () => {
  return (

    <nav className='NavBar'>

      <div className='NavBar-img-logo'>
        <img src='https://static.vecteezy.com/system/resources/previews/000/428/979/original/dog-icon-vector.jpg' alt='logo'/>
      </div>

      <div className='NavBar-links'>
    
            <NavLink to='/Home'> HOME </NavLink>        
            <NavLink to='/Create'> CREATE </NavLink>      
        
      </div>

      <div className='NavBar-Search'>
        <SearchBar/>
      </div>

    </nav>
  )
}

export default NavBar;