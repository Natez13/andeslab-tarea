import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Vistas/Home';
import Graficos from './Vistas/Graficos';
import Pyramid from './Vistas/Pyramid';
import Cubo from './Vistas/Cubo';

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/Pyramid" element={<Pyramid />} />
        <Route path="/Cubo" element={<Cubo />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
