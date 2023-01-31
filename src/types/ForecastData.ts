export type ForecastData = {
  maxTemp: {
    maxTempC: number;
    maxTempF: number;
  };
  minTemp: {
    minTempC: number;
    minTempF: number;
  };
  temp: {
    // will take the average for non-current days
    tempC: number;
    tempF: number;
  };
  wind: {
    windMPH: number;
    windKPH: number;
  };
  humidity: number; // will take the average for non-current days
  rainPercentage: number;
  condition: string;
  uv: number;

  // we can fetch current data bellow using the futureForcast api because it's provided within the array
  morningTemp: {
    morningTempC: number;
    morningTempF: number;
  };
  afternoonTemp: {
    afternoonTempC: number;
    afternoonTempF: number;
  };
  eveningTemp: {
    eveningTempC: number;
    eveningTempF: number;
  };
  nightTemp: {
    nightTempC: number;
    nightTempF: number;
  };
};
