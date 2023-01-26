import * as React from "react";
// import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );

const TodayChart = () => {
  const data = {
    labels: ["Mon", "Tue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)"
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: "y"
  };

  return (
    <Box
      sx={{
        width: 400,
        height: 250,
        marginTop: 5,
        marginLeft: 5,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7]
        }
      }}
    >
      <p>오늘의 현황</p>
      <div>
        <Bar data={data} options={options}></Bar>
      </div>
      <p>카페인 섭취량</p>
    </Box>
  );
};

export default TodayChart;
