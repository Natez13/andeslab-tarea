import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Rutas</h1>
      <Link to="/">
        <button>home</button>
      </Link>
      <Link to="/graficos">
        <button>Graficos</button>
      </Link>
      <Link to="/Pyramid">
        <button>Piramide</button>
      </Link>
      <Link to="/Cubo">
        <button>Cubo</button>
      </Link>
      
    </div>
  );
};

export default Home;
