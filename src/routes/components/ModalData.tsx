import React, { useEffect, useState, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './css/Modal.css';
import { fetchStation } from '../scripts/dataFetch';
import { StationContext, Context } from '../../context/StationContext';
import Close from './Close';
import { useTranslation } from 'react-i18next';
import { Station as S } from '../../interfaces/Interfaces';

interface Sensor {
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

interface Station {
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
  const { updateStation, marker, updateError } = useContext(StationContext) as Context
  const [stations, setStations] = useState<Station[]>([]);
  const [sensors, setSensors] = useState<StationData[]>([]);
  const [chartData, setChartData] = useState<StationData[] | null>(null);
  const [dateList, setDateList] = useState<string[]>([]);
  const [separatedData, setSeparatedData] = useState<Record<string, Station[]>>({});
  const [stationName, setStationName] = useState<string>(`Station ${targetID} data is not available`);
  const stationID = targetID.toString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: { stations: Station[] }[] = await fetchStation(stationID);

        if (fetchedData && fetchedData.length > 0) {
          const stationData = fetchedData.flatMap((data) => data.stations);
          setStationName(stationData[0].name);
          setStations(stationData);
          if (marker) {
            marker.closePopup()
            marker.closeTooltip()
          }
        } else {
          updateStation(null)
          updateError(true)
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
      const sensorList = selectedData.map((sensor: any) :SensorOption => ({
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

  return (
    <Modal onClose={() => updateStation(null)} stationName= {stationName} sensors={sensors} dateList={dateList} setChartData={setChartData} chartData={chartData} />
  );
};

const Modal: React.FC<ModalProps> = ({ sensors, setChartData, dateList, chartData }) => {
  const { station } = useContext(StationContext) as Context
  const { t, i18n } = useTranslation(['modal'])
  const [timeRange, setTimeRange] = useState<string>('');
  const [selectedSensors, setSelectedSensors] = useState<string[]>([]); // Changed to string type for random ID
  
  const filteredDates = [...new Set(dateList.map((date) => date.split('T')[0]))]
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeRange = event.target.value;
    // Update the chart data based on the selected time range
    setTimeRange(selectedTimeRange);
  };

  const getTimeRangeValue = (selectedTimeRange: string) => {
      switch (selectedTimeRange) {
        case 'today':
          return 1;
        case 'yesterday':
          return 2;
        case 'last-week':
          return 3;
        case 'last-month':
          return 4;
        default:
          return 0;
      }
    }
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
      const timeRangeValue = getTimeRangeValue(timeRange); // Get numerical value for sorting
      const todayDate = new Date().toISOString().split('T')[0];

      // Replace this with the desired date you want to find sensors for
      const desiredDate = new Date().toISOString().split('T')[0];

      const sensorsWithinTimeFrame = ( timeFrame:string) : StationData[] => {
        return sensors.filter((sensor) => {
          const sensorToDate = new Date(sensor.date).toISOString().split('T')[0];
          const sensorYesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
          const sensorOneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];
          const sensorOneMonthAgo = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
          if(timeFrame === 'today'){
            return sensorToDate === desiredDate;
          }else if(timeFrame === 'yesterday'){
            return sensorToDate === desiredDate || sensorToDate === sensorYesterday;
          }else if(timeFrame === 'last-week'){
            return sensorToDate >= sensorOneWeekAgo && sensorToDate <= todayDate;
          }else if(timeFrame === 'last-month'){
            return sensorToDate >= sensorOneMonthAgo && sensorToDate <= todayDate;
          }
          return sensor;
        });
      };
      // Get the final sensors based on the selected time range
      const finalSensors = () : StationData[] => {
        if (timeRangeValue === 1 && filteredDates.length > 0) {
          return sensorsWithinTimeFrame('today');
        } else if (timeRangeValue === 2 && filteredDates.length > 1) {
          return sensorsWithinTimeFrame('yesterday');
        }else if (timeRangeValue === 3 && filteredDates.length > 6) {
          return sensorsWithinTimeFrame('last-week');
        } else if (timeRangeValue === 4 && filteredDates.length > 29) {
          return sensorsWithinTimeFrame('last-month');
        } else {
          return sensors;
        }
      };

      for (const sensor of finalSensors()) {
        const selectedSensorData : SensorOption[] = sensor.data.filter((data) => selectedSensors.includes(data.label));
        const dateOps: Intl.DateTimeFormatOptions = {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        } 
        generatedData.push({
          date: new Date(sensor.date).toLocaleString(i18n.language === "fi" ? 'fi-FI' : 'en-US', dateOps),
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
  }, [selectedSensors, timeRange]);

  if (!sensors || sensors.length === 0) {
    return null; // Return null or a fallback component when sensors is empty or undefined
  }
  
  const modalSensorList = (): JSX.Element[] => {
  
    const handleLabelClick = (label: string) => {
      setSelectedSensors((prevSelectedSensors) => {
        if (prevSelectedSensors.includes(label)) {
          // If the label is already in the selectedSensors array, remove it
          return prevSelectedSensors.filter((sensorLabel) => sensorLabel !== label);
        } else {
          // If the label is not in the selectedSensors array, add it
          return [...prevSelectedSensors, label];
        }
      });
    };
    
    const sensorGroups: SensorOption[][] = [[],[]]

    for (const sensor of sensors[0].data) {
      sensor.label.slice(-1) === "1" 
        ? sensorGroups[0].push(sensor)
        : sensorGroups[1].push(sensor)
    }

    // Generate the JSX for grouped sensors
    const sensorList : JSX.Element[] = [];
    for (const groupName in sensorGroups) {
      sensorList.push(
        <div className='sensor-groups' key={groupName}>
          <h3>
            {i18n.language === "en" ? "Direction: " : "Suunta: "}
            {station ? station[(`direction${parseInt(groupName)+1}Municipality` as keyof S)]?.toString() : null}
          </h3>
          {sensorGroups[groupName].map((sensor: SensorOption, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
                id={sensor.label}
                value={sensor.label}
                checked={selectedSensors.includes(sensor.label)}
                onChange={handleSensorChange}
              />
              <label htmlFor={sensor.id} onClick={() => handleLabelClick(sensor.label)}>
                {t(sensor.label, {ns: 'modal'})}
              </label>
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
    <dialog className="modal-data-container">
      <div className="modal-content">
      <Close parent='dashboard'/>
        <h3 className='station-name'>{station ? station.names[i18n.language as keyof S["names"]]?.toString() : null}</h3>
        <div className='modal-sensor-list'>
          <div className='time-range'>
            <label htmlFor="time-range-select">{t("range")}</label>
            <select id="time-range-select" value={timeRange} onChange={handleTimeRangeChange}>
              <option value="">{t("selrange")}</option>
              <option value="today">{t("t")}</option>
              <option value="yesterday">{t("y")}</option>
              <option value="last-week">{t("lw")}</option>
              <option value="last-month">{t("lm")}</option>
            </select>
          </div>
          {modalSensorList()}
        </div>
        
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
                  name={t(sensorId, {ns:'modal'})}
                  stroke={lineColors[index % lineColors.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>{t("waiting")}</p>
        )}
      </div>
      </div>
    </dialog>
  );
};
export default ModalData;
