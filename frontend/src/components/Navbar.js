import React from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Gurzak</h1>
          <h2>Piramide de Transformacion</h2>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
