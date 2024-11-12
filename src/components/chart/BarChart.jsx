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
  const parsedData = JSON.parse(data.data);
  console.log("parsed data: ", parsedData);
  const labels = [
    "anger",
    "joy",
    "sadness",
    "happiness",
    "chilled",
    "adventurous",
    "loneliness",
  ];
  let values = [];

  // Check if parsedData is an object and not empty
  if (parsedData) {
    values = [
      parsedData.anger,
      parsedData.joy,
      parsedData.sadness,
      parsedData.happiness,
      parsedData.chilled || 0, // Default to 0 if property does not exist
      parsedData.adventurous || 0, // Default to 0 if property does not exist
      parsedData.loneliness,
    ];
  }

  // Log the values to see if they are updated
  console.log("Values:", values);

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
