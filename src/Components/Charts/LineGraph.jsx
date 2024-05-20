import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const LineGraph = () => {
  // state for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // fetching data from API and updating chart data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching data from API
        const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const con = document.createElement('canvas').getContext('2d');
        
        // gradient colors for chart
        const gradientBlue = con.createLinearGradient(0, 0, 0, 400);
        gradientBlue.addColorStop(0, 'rgba(54, 162, 235, 0.5)');
        gradientBlue.addColorStop(1, 'rgba(54, 162, 235, 0)');

        const gradientRed = con.createLinearGradient(0, 0, 0, 400);
        gradientRed.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
        gradientRed.addColorStop(1, 'rgba(255, 99, 132, 0)');

        const gradientGreen = con.createLinearGradient(0, 0, 0, 400);
        gradientGreen.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
        gradientGreen.addColorStop(1, 'rgba(75, 192, 192, 0)');
        
        // generating chart data
        const chartData = {
          labels: Object.keys(data.cases || {}),
          datasets: [
            { 
                label: 'Cases', data: Object.values(data.cases || {}), fill: true,  backgroundColor: gradientBlue,borderColor: 'blue', 
                tension: 0.1,pointRadius: 0, borderWidth: 1.5
            },
            {
                label: 'Deaths', data: Object.values(data.deaths || {}), fill: true, backgroundColor: gradientRed, borderColor: 'red',
                tension: 0.1, pointRadius: 0, borderWidth: 1.5,
            },
            {
                label: 'Recovered', data: Object.values(data.recovered || {}), fill: true, backgroundColor: gradientGreen, borderColor: 'green',
                tension: 0.1, pointRadius: 0,borderWidth: 1.5,
            }],
        };
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const options = { responsive: true, plugins: {
      legend: { position: 'top'},
      title: { display: true, text: 'COVID-19 Cases Over Time'},
      tooltip: { mode: 'index', intersect: false, 
      callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`;
          }}},
        },
    interaction: { mode: 'nearest', intersect: false},
    scales: { 
        x: { display: true, title: { display: true, text: 'Date',},},
        y: { display: true, title: { display: true, text: 'Number of Cases',},
        beginAtZero: true, },},};
        
  // rendering the LineGraph component
  return ( 
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">COVID-19 Cases Over Time</h2>

      {/* checking whether data from api is availabile or not for handle error */}
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="mt-2">Loading...  Please Wait</span>
        </div>
      )}
    </div>
  );
};

export default LineGraph;
