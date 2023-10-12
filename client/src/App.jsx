import {Routes, Route, useLocation} from 'react-router-dom';
import Landing from './views/Landing/Landing.jsx';
import Detail from './views/Detail/Detail.jsx';
import Create from './views/formCreate/Create.jsx';
import Home from './views/Home/Home.jsx';
import NavBar from './components/Navbar/NavBar.jsx';


import './App.css'




function App() {

  const {pathname} = useLocation();
  

  return (
    <div className='App-Style'>
      <div>
        {pathname !== '/' && <NavBar onSearch=''/*{onSearch}*//>}
      </div>
      
      <div>
        <Routes className='Pages'>
          <Route path={'/'} element= {<Landing/>}/>;
          <Route path={'/Home'} element= {<Home/>}/>;
          <Route path={'/Detail/:id'} element= {<Detail/>}/>;
          <Route path={'/Create'} element= {<Create/>}/>;
        </Routes>
      </div>
      
    </div>
  )
}

export default App;
