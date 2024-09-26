import React, { useRef, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'blue',
    'purple',
];

// Function to generate random data for the chart
const generateRandomData = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Sample chart data
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => generateRandomData(-1000, 1000)),
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => generateRandomData(-1000, 1000)),
        },
    ],
};

// Function to create gradient for chart
function createGradient(ctx, area) {
    const colorStart = colors[Math.floor(Math.random() * colors.length)];
    const remainingColors = colors.filter(color => color !== colorStart);
    const colorMid = remainingColors[Math.floor(Math.random() * remainingColors.length)];
    const colorEnd = remainingColors.filter(color => color !== colorMid)[0];

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export function SalesChart() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                borderColor: createGradient(chart.ctx, chart.chartArea),
            })),
        };

        setChartData(chartData);
    }, []);

    return <Chart ref={chartRef} type="line" data={chartData} />;
}

