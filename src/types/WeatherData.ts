export type WeatherData = {
    temp: {
      tempC: number;
      tempF: number;
    };
    isDay: boolean;
    wind: {
      windMPH: number;
      windKPH: number;
      windDegree: number;
      windDirection: string;
    };
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    pressure: {
      pressureMB: number;
      pressureIN: number;
    };
    precip: {
      precipMM: number;
      precipIN: number;
    };
    humidity: number;
    cloud: number;
    feelsLike: {
      feelsLikeC: number;
      feelsLikeF: number;
    };
    vis: {
      visKM: number;
      visMILES: number;
    };
    uv: number;
    gust: {
      gustMPH: number;
      gustKPH: number;
    };
  };
  