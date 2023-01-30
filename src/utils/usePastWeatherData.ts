import { useEffect, useState } from "react";
import { WeatherData } from "../types/WeatherData";
import { instance, URL } from "../api/instance";
import { useUserData } from "./useUserData";

type PastForcast = {
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
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  uv: number;
  hour: WeatherData[] | null;
};

export const usePastWeatherData = () => {
  const [pastWeather, setPastWeather] = useState<PastForcast[]>([]);
  const userData = useUserData();

  useEffect(() => {
    if (!userData.status) {
      instance
        .get(`${URL}/history.jso`, {
          params: {
            q: `${userData.geolocation.lat},${userData.geolocation.long}`,
            dt: userData.date.lastWeek,
            end_dt: userData.date.current
          },
        })
        .then((response) => {
          const forecastArr = response.data.forecast.forecastday;
          const updatedPastWeather = forecastArr.map((day: any) => {
            return {
              maxTemp: {
                maxTempC: day.day.maxtemp_c,
                maxTempF: day.day.maxtemp_f,
              },
              minTemp: {
                minTempC: day.day.mintemp_c,
                minTempF: day.day.mintemp_f,
              },
              avgTemp: {
                avgTempC: day.day.avgtemp_c,
                avgTempF: day.day.avgtemp_f,
              },
              maxWind: {
                maxWindMPH: day.day.maxwind_mph,
                maxWindKPH: day.day.maxwind_kph,
              },
              totalPrecip: {
                totalPrecipMM: day.day.totalprecip_mm,
                totalPrecipIN: day.day.totalprecip_in,
              },
              totalSnowCM: day.day.totalsnow_cm,
              avgVis: {
                avgVisKM: day.day.avgvis_km,
                avgVisMILES: day.day.avgvis_miles,
              },
              avgHumidity: day.day.avghumidity,
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon,
                code: day.day.condition.code,
              },
              uv: day.day.uv,
            };
          });
          setPastWeather(updatedPastWeather);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData.status]);

  return pastWeather;
};
