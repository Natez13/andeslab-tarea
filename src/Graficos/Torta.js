import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TodoPieChart = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Función para obtener los datos desde la API
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching the todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const completedTasks = todos.filter(todo => todo.completed).length;
  const incompleteTasks = todos.length - completedTasks;

  const data = [
    { name: 'Completed', value: completedTasks },
    { name: 'Incomplete', value: incompleteTasks }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="pie-chart-container">
      <PieChart width={400} height={400}       
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" marginLeft ="40px" /> {/* Ajusta la leyenda */}
      </PieChart>
    </div>
  );
};

export default TodoPieChart;
