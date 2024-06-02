import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const groupDataByUserId = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const { userId } = item;
    if (!acc[userId]) {
      acc[userId] = { userId, cantidad: 0 };
    }
    acc[userId].cantidad += 1;
    return acc;
  }, {});

  return Object.values(groupedData);
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ChartComponent = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching the albums:', error);
      }
    };
  
    fetchAlbums();
  }, []);

  const groupedData = groupDataByUserId(albums);

  return (
    <div className="chart-container">
      <BarChart
        width={600}
        height={300}
        data={groupedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Ajuste en el margen inferior
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="userId" label={{ value: 'ID de Usuario', position: 'bottom', offset: 5 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cantidad">
          {groupedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default ChartComponent;
