import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Card} from './Card';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       React JS Tutorial
     </h3>

    <Navigation/>
    <Routes>
       <Route path='/home' element={<Home/>} exact/>
       <Route path='/department' element={<Department/>}/>
       <Route path='/employee' element={<Employee/>}/>
       <Route path='/card' element={<Card/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;