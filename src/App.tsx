import React from "react";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Header } from "./props/Heder";

import "./style.css";

import { Home } from "./props/pages/Home";
import { Log } from "./props/pages/Log";
import { Page404 } from "./props/pages/Page404";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
