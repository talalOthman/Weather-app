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
  condition: {
    text: string;
    icon: string;
  }
  uv: number;

  // we can fetch current data bellow using the futureForcast api because it's provided within the array
  morningTemp: {
    maxMorningTemp: {
      morningTempC: number;
      morningTempF: number;
    };
    minMorningTemp: {
      morningTempC: number;
      morningTempF: number;
    };
  };
  afternoonTemp: {
    maxAfternoonTemp: {
      afternoonTempC: number;
      afternoonTempF: number;
    };
    minAfternoonTemp: {
      afternoonTempC: number;
      afternoonTempF: number;
    };
  };
  eveningTemp: {
    maxEveningTemp: {
      eveningTempC: number;
      eveningTempF: number;
    };
    minEveningTemp: {
      eveningTempC: number;
      eveningTempF: number;
    };
  };
  morningCondition: string;
  afternoonCondition: string;
  eveningCondition: string;
};
