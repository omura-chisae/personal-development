import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <h3>アプリ名</h3>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/log">Log</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
