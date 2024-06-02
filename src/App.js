import { Route, Routes, useLocation } from 'react-router-dom';
import Graficos from './Vistas/Graficos';
import Pyramid from './Vistas/Pyramid';
import Cubo from './Vistas/Cubo';
import NavBar from './Vistas/NavBar';
import './App.css';

const App = () => {
  const location = useLocation();

  return (
    <div className="App-Background">
      <NavBar />
      {location.pathname === '/' && (
        <div className="container mt-3 text-center">
          <img src="/andesLab.png" alt="andesLab" />
        </div>
      )}
      <div className="container mt-3">
        <Routes>
          <Route path="/graficos" element={<Graficos />} />
          <Route path="/Piramide" element={<Pyramid />} />
          <Route path="/Cubo" element={<Cubo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
