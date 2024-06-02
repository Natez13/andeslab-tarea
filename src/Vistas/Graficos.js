import ChartComponent from '../Graficos/Barras';
import TodoPieChart from '../Graficos/Torta';
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

const Graficos = () => {
  return (
    <div className="App-header">
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <h1>Gráfico de Usuarios Barras</h1>
        <ChartComponent />
        <h1>Gráfico de Usuarios Torta</h1>
        <TodoPieChart  />
    </div>
  );
};

export default Graficos;
