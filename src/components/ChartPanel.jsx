import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ChartPanel = () => {
  useEffect(() => {
    new Chart(document.getElementById("genreChart"), {
      type: "bar",
      data: {
        labels: ["Action", "Comedy", "Drama", "Horror"],
        datasets: [{
          label: "Most Watched Genres",
          data: [12, 19, 7, 5],
          backgroundColor: ["red", "blue", "green", "purple"]
        }]
      }
    });

    new Chart(document.getElementById("trendChart"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [{
          label: "Watch Trends",
          data: [3, 8, 2, 5],
          borderColor: "orange",
          fill: false
        }]
      }
    });
  }, []);

  return (
    <div className="charts-container">
      <canvas id="genreChart"></canvas>
      <canvas id="trendChart"></canvas>
    </div>
  );
};

export default ChartPanel;
