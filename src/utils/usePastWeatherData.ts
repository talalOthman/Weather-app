import { useEffect, useState } from "react";
import { instance, URL } from "../api/instance";
import { useUserData } from "./useUserData";
import { ForecastData } from "../types/ForecastData";

export const usePastWeatherData = () => {
  const [pastWeather, setPastWeather] = useState<ForecastData[]>([]);
  const [isPastSet, setIsPastSet] = useState<boolean>(false)
  const userData = useUserData();

  useEffect(() => {
    if (!userData.status) {
      instance
        .get(`${URL}/history.json`, {
          params: {
            q: `${userData.geolocation.lat},${userData.geolocation.long}`,
            dt: userData.date.lastWeek,
            end_dt: userData.date.current,
          },
        })
        .then((response) => {
          const forecastArr = response.data.forecast.forecastday;
          const updatedPastWeather = forecastArr.map((day: any) => {
            return {
              maxTemp: {
                maxTempC: Math.floor(day.day.maxtemp_c),
                maxTempF: Math.floor(day.day.maxtemp_f),
              },
              minTemp: {
                minTempC: Math.floor(day.day.mintemp_c),
                minTempF: Math.floor(day.day.mintemp_f),
              },
              temp: {
                tempC: Math.floor(day.day.avgtemp_c),
                tempF: Math.floor(day.day.avgtemp_f),
              },
              wind: {
                windMPH: Math.floor(day.day.maxwind_mph),
                windKPH: Math.floor(day.day.maxwind_kph),
              },
              humidity: Math.floor(day.day.avghumidity),
              rainPercentage: Math.floor(day.hour[12].chance_of_rain),
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon
              },
              uv: day.day.uv,
              morningTemp: {
                minMorningTemp:{
                  morningTempC: Math.floor(day.hour[6].temp_c),
                  morningTempF: Math.floor(day.hour[6].temp_f),
                },
                maxMorningTemp:{
                  morningTempC: Math.floor(day.hour[11].temp_c),
                  morningTempF: Math.floor(day.hour[11].temp_f),
                }
              },
              afternoonTemp: {
                minAfternoonTemp:{
                  afternoonTempC: Math.floor(day.hour[12].temp_c),
                  afternoonTempF: Math.floor(day.hour[12].temp_f),
                },
                maxAfternoonTemp:{
                  afternoonTempC: Math.floor(day.hour[16].temp_c),
                  afternoonTempF: Math.floor(day.hour[16].temp_f),
                }
              },
              eveningTemp: {
                minEveningTemp:{
                  eveningTempC: Math.floor(day.hour[17].temp_c),
                  eveningTempF: Math.floor(day.hour[17].temp_f),
                },
                maxEveningTemp:{
                  eveningTempC: Math.floor(day.hour[23].temp_c),
                  eveningTempF: Math.floor(day.hour[23].temp_f),
                }
              },
              morningCondition: day.hour[6].condition.icon,
              afternoonCondition: day.hour[12].condition.icon,
              eveningCondition: day.hour[17].condition.icon,
            };
          });
          setPastWeather(updatedPastWeather);
          setIsPastSet(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData.status]);

  return {pastWeather, isPastSet};
};
