import { useEffect, useState } from "react";
import { WeatherData } from "../types/WeatherData";
import { LocationData } from "../types/LocationData";

type FutureForcast = {
  maxTemp: {
    maxTempC: number;
    maxTempF: number;
  };
  minTemp: {
    minTempC: number;
    minTempF: number;
  };
  avgTemp: {
    avgTempC: number;
    avgTempF: number;
  };
  maxWind: {
    maxWindMPH: number;
    maxWindKPH: number;
  };
  totalPrecip: {
    totalPrecipMM: number;
    totalPrecipIN: number;
  };
  totalSnowCM: number;
  avgVis: {
    avgVisKM: number;
    avgVisMILES: number;
  };
  avgHumidity: number;
  dailyRain: {
    dailyWillItRain: boolean;
    dailyChanceOfRain: number;
  };
  dailySnow: {
    dailyWillItSnow: boolean;
    dailyChanceOfSnow: number;
  };
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  uv: number;
  hour: WeatherData[];
};

export const useFutureWeatherData = () => {
    const [location, setLocation] = useState<LocationData>();
};
