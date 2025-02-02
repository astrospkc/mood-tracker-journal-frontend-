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
import { Bar, Pie } from "react-chartjs-2";

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
  console.log("data in barchat: ", data, data.data);
  let parsedData;
  if (data && data.data.length > 0) {
    parsedData = JSON.parse(data.data);
  }

  console.log("parsed data: ", parsedData);

  // console.log("parsed data: ", parsedData);/
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
  // console.log("Values:", values);

  const emotions_data_bar = {
    labels,
    datasets: [
      {
        label: "Emotions",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log("parsed Data: ", parsedData);
  console.log("emotions ", emotions_data_bar);

  return (
    <div className=" text-white p-4  rounded-3xl   h-[400px] mb-20 yusei-magic-regular">
      {parsedData && (
        <div className="m-4">
          {" "}
          <span className="text-xl text-red-400">Tips and improvements :</span>
          <span className=" rounded-lg p-2 text-gray-400">
            {parsedData.tips_and_improvements}{" "}
          </span>
        </div>
      )}

      <Bar data={emotions_data_bar} />
    </div>
  );
};

export default BarChart;
