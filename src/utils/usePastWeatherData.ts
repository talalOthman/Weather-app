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
                maxTempC: day.day.maxtemp_c,
                maxTempF: day.day.maxtemp_f,
              },
              minTemp: {
                minTempC: day.day.mintemp_c,
                minTempF: day.day.mintemp_f,
              },
              temp: {
                tempC: day.day.avgtemp_c,
                tempF: day.day.avgtemp_f,
              },
              wind: {
                windMPH: day.day.maxwind_mph,
                windKPH: day.day.maxwind_kph,
              },
              humidity: day.day.avghumidity,
              rainPercentage: day.hour[12].chance_of_rain,
              condition: day.day.condition.text,
              uv: day.day.uv,
              morningTemp: {
                morningTempC: day.hour[6].temp_c,
                morningTempF: day.hour[6].temp_f,
              },
              afternoonTemp: {
                afternoonTempC: day.hour[12].temp_c,
                afternoonTempF: day.hour[12].temp_f,
              },
              eveningTemp: {
                eveningTempC: day.hour[17].temp_c,
                eveningTempF: day.hour[17].temp_f,
              },
              nightTemp: {
                nightTempC: day.hour[21].temp_c,
                nightTempF: day.hour[21].temp_f,
              },
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
