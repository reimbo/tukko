import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './css/Modal.css';
interface ModalProps {
  onClose: () => void;
}

interface SensorOption {
  value: string;
  label: string;
}

const sensors: SensorOption[] = [
  { value: 'sensor1', label: 'Sensor 1' },
  { value: 'sensor2', label: 'Sensor 2' },
  { value: 'sensor3', label: 'Sensor 3' },
  // Add more sensor options here
];

const generateRandomData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dataPoint = {
      date: date.toISOString().slice(0, 10),
    };

    sensors.forEach((sensor) => {
      dataPoint[sensor.value] = Math.floor(Math.random() * 100); // Generate random data value for each sensor
    });

    data.push(dataPoint);
  }

  return data;
};

const ModalData: React.FC<ModalProps> = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState<string>(''); // Selected time range
  const [selectedSensors, setSelectedSensors] = useState<string[]>([]); // Selected sensors
  const [chartData, setChartData] = useState<any[]>([]); // Chart data

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
  };

  const handleSensorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedSensors((prevSelectedSensors) => [...prevSelectedSensors, value]);
    } else {
      setSelectedSensors((prevSelectedSensors) => prevSelectedSensors.filter((sensor) => sensor !== value));
    }
  };

  const handleGenerateGraph = () => {
    const generatedData = generateRandomData();
    setChartData(generatedData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Traffic Visualizer Dashboard</h2>
        <div>
          <label htmlFor="time-range-select">Time Range:</label>
          <select id="time-range-select" value={timeRange} onChange={handleTimeRangeChange}>
            <option value="">Select Time Range</option>
            <option value="yesterday">Yesterday</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
        <div>
          <label>Sensors:</label>
          {sensors.map((sensor) => (
            <div key={sensor.value}>
              <input
                type="checkbox"
                id={sensor.value}
                value={sensor.value}
                checked={selectedSensors.includes(sensor.value)}
                onChange={handleSensorChange}
              />
              <label htmlFor={sensor.value}>{sensor.label}</label>
            </div>
          ))}
        </div>
        <button onClick={handleGenerateGraph}>Generate Graph</button>
        <button onClick={onClose}>Close</button>
        <div className="graph-container">
          {/* Render the graph using the selected data */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {selectedSensors.map((sensor) => (
                <Line key={sensor} type="monotone" dataKey={sensor} stroke="#8884d8" />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ModalData;
