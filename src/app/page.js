"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

export default function Home() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const data = response.data;

      const labels = data.map(item => item.title);
      const values = data.map(item => item.userId);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'User ID',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!chartData) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>Veri Görselleştirme</h1>
      <Bar data={chartData} />
    </div>
  );
}