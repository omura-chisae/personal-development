import React from "react";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Header } from "./props/Heder";

import "./style.css";

import { Home } from "./props/pages/Home";
import { Log } from "./props/pages/Log";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
