/**
 * This is the history data API module.
 * Usage: fetch all history data from https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_101_17_32.csv
 * Currently not using this module because the data is still vague
 */
import axios from 'axios';


const apiUrl = 'https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_101_17_32.csv';

axios.get(apiUrl)
  .then((response) => {
    const csvData = response.data;
    const lines = csvData.split('\n');

    // Define the names array
    const names = [
      'tmsPointId',
      'year',
      'ordinalDate',
      'hour',
      'minute',
      'second',
      'oneHundredthSecond',
      'length',
      'lane',
      'direction',
      'vehicleClass',
      'speed',
      'faulty',
      'totalTime',
      'timeInterval',
      'queueStart',
    ];

    for (let i = 1; i <= 2; i++) { // Loop through the first 5 lines (excluding header)
      if (i < lines.length) {
        const values = lines[i].split(';');
        const result: { [key: string]: string } = {}; // Define result object type


        for (let j = 0; j < names.length; j++) {
          const name = names[j];
          const value = values[j];
          result[name]= value;
        }

        console.log(result);
      }
    }
  })
  .catch((error) => {
    console.error('Error fetching CSV file:', error);
  });
