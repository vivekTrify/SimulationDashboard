import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, onBarClick, chartHeight }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 
  // console.log(data.color);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); 
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.color,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false // Hide legend
            }
          },
          scales: {
            x: {
              display: false, // Hide x-axis
            },
            y: {
              display: false, // Hide y-axis
            }
          },
          onClick: (event, elements) => {
            if (onBarClick && elements && elements.length > 0) {
              const index = elements[0].index;
              onBarClick(index);
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); 
      }
    };
  }, [data, onBarClick, chartHeight]);

  return <canvas ref={chartRef} style={{ height: chartHeight }} />;
};

export default BarChart;
