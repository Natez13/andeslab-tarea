import ChartComponent from '../Graficos/Barras';
import TodoPieChart from '../Graficos/Torta';
import '../Css/Graficos.css'; // Importa un archivo CSS para los estilos

const Graficos = () => {
  return (
    <div className="row">
      <div className="col-md-6 d-flex align-items-center justify-content-center"> {/* Centra el contenido horizontal y verticalmente */}
        <div className="grafico-container"> {/* Contenedor con estilos personalizados */}
          <h1 className="text-center">Gráfico de Usuarios Barras</h1>
          <ChartComponent />
        </div>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center"> {/* Centra el contenido horizontal y verticalmente */}
        <div className="grafico-container"> {/* Contenedor con estilos personalizados */}
          <h1 className="text-center">Gráfico de Usuarios Torta</h1>
          <TodoPieChart />
        </div>
      </div>
    </div>
  );
};

export default Graficos;
