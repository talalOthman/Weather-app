import { useEffect, useState } from "react";
import { WeatherData } from "../types/WeatherData";
import { LocationData } from "../types/LocationData";
import { instance, URL } from "../api/instance";
import { useUserData } from "./useUserData";

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
  hour: WeatherData[] | null;
};

export const useFutureWeatherData = () => {
  const [location, setLocation] = useState<LocationData>();
  const [futureWeather, setFutureWeather] = useState<FutureForcast[]>([]);
  const [currentWeather, setCurrentWeather] = useState<WeatherData>();
  const userData = useUserData();

  useEffect(() => {
    if (!userData.status) {
      instance
        .get(`${URL}/forecast.jso`, {
          params: {
            q: `${userData.geolocation.lat},${userData.geolocation.long}`,
            days: 3,
          },
        })
        .then((response) => {
          setLocation({
            name: response.data.location.name,
            region: response.data.location.region,
            country: response.data.location.country,
          });
          const forecastArr = response.data.forecast.forecastday;
          const updatedFutureWeather = forecastArr.map((day: any) => {
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
              dailyRain: {
                dailyWillItRain: day.day.daily_will_it_rain,
                dailyChanceOfRain: day.day.daily_chance_of_rain,
              },
              dailySnow: {
                dailyWillItSnow: day.day.daily_will_it_snow,
                dailyChanceOfSnow: day.day.daily_chance_of_snow,
              },
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon,
                code: day.day.condition.code,
              },
              uv: day.day.uv,
            };
          });
          setFutureWeather(updatedFutureWeather);
          setCurrentWeather({
            temp: {
              tempC: response.data.current.temp_c,
              tempF: response.data.current.temp_f,
            },
            isDay: response.data.current.is_day,
            wind: {
              windMPH: response.data.current.wind_mph,
              windKPH: response.data.current.wind_kph,
              windDegree: response.data.current.wind_degree,
              windDirection: response.data.current.wind_dir,
            },
            condition: {
              text: response.data.current.condition.text,
              icon: response.data.current.condition.icon,
              code: response.data.current.condition.code,
            },
            pressure: {
              pressureMB: response.data.current.pressure_mb,
              pressureIN: response.data.current.pressure_in,
            },
            precip: {
              precipMM: response.data.current.precip_mm,
              precipIN: response.data.current.precip_in,
            },
            humidity: response.data.current.humidity,
            cloud: response.data.current.cloud,
            feelsLike: {
              feelsLikeC: response.data.current.feelslike_c,
              feelsLikeF: response.data.current.feelslike_f,
            },
            vis: {
              visKM: response.data.current.vis_km,
              visMILES: response.data.current.vis_miles,
            },
            uv: response.data.current.uv,
            gust: {
              gustMPH: response.data.current.gust_mph,
              gustKPH: response.data.current.gust_kph,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData.status]);

  return { location, futureWeather, currentWeather };
};
