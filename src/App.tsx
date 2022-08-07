import React from 'react';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { Home } from './props/pages/Home';
import { Log } from './props/pages/Log';


function App() {
  return (
      <BrowserRouter>
        <div className='App'>
          <Link to="/">Home</Link>
          <br/>
          <Link to="/log">Log</Link>
        </div>
      

        <Routes>
        <Route path="/" element={<Home/>}/>
          
        </Routes>

        <Routes>
          <Route path="/log" element={<Log/>}/>
 
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
