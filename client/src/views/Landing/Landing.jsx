import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingStyle.css';


const Landing = () => {

  return (
    <div className="landing">
      <NavLink to='/Home'>  
        <button className='miBoton'> Home </button>
      </NavLink>
    </div>
  )
}

export default Landing;