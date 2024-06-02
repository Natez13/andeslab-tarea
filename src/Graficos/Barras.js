import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';






const groupDataByUserId = (data) => {
  
  const groupedData = data.reduce((acc, item) => {
    const { userId } = item;
    if (!acc[userId]) {
      acc[userId] = { userId, count: 0 };
    }
    acc[userId].count += 1;
    return acc;
  }, {});

  return Object.values(groupedData);
};

const ChartComponent = () => {
  
  
  const [albums, setAlbums] = useState([]);
  const data = albums;

  useEffect(() => {
    // Función para obtener los datos desde la API
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

  const groupedData = groupDataByUserId(data);

  return (
    <BarChart
      width={600}
      height={300}
      data={groupedData}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="userId" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default ChartComponent;
