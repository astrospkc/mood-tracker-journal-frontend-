CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend;
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const BarChart = (data) => {
  console.log(data);
  const labels = [
    "anger",
    "joy",
    "sadness",
    "happiness",
    "chilled",
    "adventurous",
    "loneliness",
  ];

  console.log("data in week analysis: ");

  const values = [
    data.data[0].anger,
    data.data[0].joy,
    data.data[0].sadness,
    data.data[0].happiness,
    data.data[0].chilled,
    data.data[0].adventurous,
    data.data[0].loneliness,
  ];
  const emotions_data = {
    labels,
    datasets: [
      {
        label: "Emotions",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Bar data={emotions_data} />
    </div>
  );
};

export default BarChart;
