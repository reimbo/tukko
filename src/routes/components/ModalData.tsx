import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './css/Modal.css';
import { fetchStation } from '../scripts/dataFetch';

export interface Sensor {
  id?: number;
  stationId?: number;
  name: string;
  shortName: string;
  timeWindowStart?: Date | string;
  timeWindowEnd?: Date | string;
  measuredTime: Date | string;
  unit: string;
  sensorValueDescriptionFi?: string;
  sensorValueDescriptionEn?: string;
  value: number;
}

export interface Station {
  id?: number;
  tmsNumber: number;
  coordinates: number[];
  name: string;
  dataUpdatedTime?: Date | string;
  sensorValues: Sensor[];
}

interface ModalProps {
  onClose: () => void;
  stationName: string;
  dateList: string[];
  sensors: StationData[];
  setChartData: any;
  chartData: any[] | null;
}

interface SensorOption {
  value: number;
  label: string;
  id: string; // Changed to string type for random ID
}

interface StationData {
  date: string;
  data: SensorOption[];
}


// Utility function to generate a random ID
const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const ModalData: React.FC<{ targetID: string }> = ({ targetID }) =>{
  const [showModal, setShowModal] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [sensors, setSensors] = useState<StationData[]>([]);
  const [chartData, setChartData] = useState<any[] | null>(null);
  const [dateList, setDateList] = useState<string[]>([]);
  const [separatedData, setSeparatedData] = useState<Record<string, Station[]>>({});
  const [stationName, setStationName] = useState<string>(`Station ${targetID} data is not available`);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  
  const stationID = targetID.toString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: { stations: Station[] }[] = await fetchStation(stationID);

        if (fetchedData && fetchedData.length > 0) {
          const stationData = fetchedData.flatMap((data) => data.stations);
          setIsFetched(true);
          setStationName(stationData[0].name);
          setStations(stationData);
        } else {
          console.error('Empty or undefined data received from the API.');
        }
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatedSeparatedData: Record<string, Station[]> = {};

    for (const obj of stations) {
      const dataUpdatedTime: string = obj.dataUpdatedTime?.toString() ?? '';

      if (dataUpdatedTime) {
        if (updatedSeparatedData[dataUpdatedTime]) {
          updatedSeparatedData[dataUpdatedTime].push(obj);
        } else {
          updatedSeparatedData[dataUpdatedTime] = [obj];
        }
      }
    }

    setSeparatedData(updatedSeparatedData);
    setDateList(Object.keys(updatedSeparatedData));
  }, [stations]);

  useEffect(() => {
    const filteredSensors: StationData[] = [];

    for (const date of dateList) {
      const selectedData = separatedData[date];

      const sensorList = selectedData.map((sensor: any) => ({
        value: sensor.sensorValues.value,
        label: sensor.sensorValues.name,
        id: generateRandomId(), // Generate random ID
      }));

      const dateData = {
        date: date,
        data: sensorList,
      };

      filteredSensors.push(dateData);
    }

    setSensors(filteredSensors);
  }, [dateList, separatedData]);

  const openModal = () => {
    if(isFetched)
    {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="modal">
      <h2> {stationName} <br/> Traffic Dashboard</h2>
      <button className='modal-show' onClick={openModal}>Show Dashboard</button>
      {!isFetched && <p>There is currently no data available for this station. Please switch to other stations</p>}
      {showModal && (
        <Modal onClose={closeModal} stationName= {stationName} sensors={sensors} dateList={dateList} setChartData={setChartData} chartData={chartData} />

      )}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ onClose,stationName, sensors, setChartData, dateList, chartData }) => {
  const [timeRange, setTimeRange] = useState<number>(0);
  const [selectedSensors, setSelectedSensors] = useState<string[]>([]); // Changed to string type for random ID
  

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeRange = event.target.value;
    // Update the chart data based on the selected time range
    if (selectedTimeRange === 'yesterday') {
      setTimeRange(1);
    }
    if (selectedTimeRange === 'last-week') {
      setTimeRange(2);
    }
    if (selectedTimeRange === 'last-month') {
      setTimeRange(3);
    }
  };

  const handleSensorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sensorId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedSensors((prevSelectedSensors) => {
      if (isChecked) {
        return [...prevSelectedSensors, sensorId];
      } else {
        return prevSelectedSensors.filter((id) => id !== sensorId);
      }
    });
  };

  const handleGenerateGraph = () => {
    if (selectedSensors.length > 0) {
      const generatedData: any[] = [];
      const finalSensors = () => {
        if (timeRange === 1) {
          return sensors.slice(sensors.length - 3, sensors.length - 1);
        } else if (timeRange === 2 && dateList.length > 7) {
          return sensors.slice(sensors.length - 8, sensors.length - 1);
        } else if (timeRange === 3 && dateList.length > 31) {
          return sensors.slice(sensors.length - 31, sensors.length - 1);
        } else {
          return sensors;
        }
      };
      for (const sensor of finalSensors()) {
        const selectedSensorData = sensor.data.filter((data) => selectedSensors.includes(data.label));

        generatedData.push({
          date: sensor.date,
          ...selectedSensorData.reduce((obj, data) => {
            obj[data.label] = data.value;
            return obj;
          }, {} as Record<string, number>),
        });
      }
      setChartData(generatedData);
    } else {
      setChartData([]);
    }
  };

  useEffect(() => {
    handleGenerateGraph();
  }, [selectedSensors]);

  if (!sensors || sensors.length === 0) {
    return null; // Return null or a fallback component when sensors is empty or undefined
  }
  
  const sortSensorNames = (a : string, b : string) => {
    const prefixOrder = ['OHITUKSET', 'KESKINOPEUS'];
    const [prefixA, suffixA] = a.split('_');
    const [prefixB, suffixB] = b.split('_');
  
    if (prefixA !== prefixB) {
      return prefixOrder.indexOf(prefixA) - prefixOrder.indexOf(prefixB);
    } else if (suffixA && suffixB) {
      return suffixA.localeCompare(suffixB);
    } else {
      return a.localeCompare(b);
    }
  };
  
  
  const modalSensorList = (): JSX.Element[] => {
    const sensorGroups : Record<string, SensorOption[]> = {};
  
    // Group sensors based on their categories
    for (const sensor of sensors[0].data) {
      const groupName = sensor.label.split('_')[0]; // Extract the prefix from the sensor label
      if (!sensorGroups[groupName]) {
        sensorGroups[groupName] = [];
      }
      sensorGroups[groupName].push(sensor);
    }
  
    // Sort the sensors within each group
    for (const groupName in sensorGroups) {
      sensorGroups[groupName].sort((a, b) => sortSensorNames(a.label, b.label));
    }
  
    // Generate the JSX for grouped sensors
    const sensorList : JSX.Element[] = [];
    for (const groupName in sensorGroups) {
      sensorList.push(
        <div className='sensor-groups' key={groupName}>
          <h3>{groupName}</h3>
          {sensorGroups[groupName].map((sensor: SensorOption, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
                id={sensor.label}
                value={sensor.label}
                checked={selectedSensors.includes(sensor.label)}
                onChange={handleSensorChange}
              />
              <label htmlFor={sensor.id}>{sensor.label}</label>
            </div>
          ))}
        </div>
      );
    }
  
    return sensorList;
  };
  
  
  const lineColors = [
    '#1f77b4', // Blue
    '#ff7f0e', // Orange
    '#2ca02c', // Green
    '#d62728', // Red
    '#9467bd', // Purple
    '#8c564b', // Brown
    '#e377c2', // Pink
    '#7f7f7f', // Gray
    '#bcbd22', // Yellow-green
    '#17becf', // Cyan
    '#aec7e8', // Light blue
    '#ffbb78', // Light orange
    '#98df8a', // Light green
    '#ff9896', // Light red
    '#c5b0d5', // Light purple
    '#c49c94', // Light brown
    '#f7b6d2', // Light pink
    '#c7c7c7'  // Light gray
  ];
  return (
    <div className="modal-data-container">
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
        <h3 className='s-name'>{stationName}</h3>
        <div className='modal-sensor-list'>
          
          {modalSensorList()}
        </div>
        <button onClick={handleGenerateGraph}>Generate Graph</button>
        <button onClick={onClose}>Close</button>
        <div className="graph-container">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedSensors.map((sensorId, index) => (
                <Line
                  key={sensorId}
                  type="monotone"
                  dataKey={sensorId}
                  name={sensorId}
                  stroke={lineColors[index % lineColors.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No chart data available</p>
        )}
      </div>
      </div>
    </div>
  );
};
export default ModalData;
