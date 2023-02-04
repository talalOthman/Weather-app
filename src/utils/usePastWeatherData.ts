import { useEffect, useState } from "react";
import { instance, URL } from "../api/instance";
import { useUserData } from "./useUserData";
import { ForecastData } from "../types/ForecastData";

export const usePastWeatherData = () => {
  const [pastWeather, setPastWeather] = useState<ForecastData>();
  const [isPastSet, setIsPastSet] = useState<boolean>(true)
  const [isPastLoading, setIsPastLoading] = useState(false);
  const [searchPastLocation, setSearchPastLocation] = useState<any>()
  const userData = useUserData();

  useEffect(() => {
    setIsPastLoading(true)
    setIsPastSet(false)
    if (!userData.status) {
      instance
        .get(`${URL}/history.json`, {
          params: {
            q: searchPastLocation ? searchPastLocation : `${userData.geolocation.lat},${userData.geolocation.long}`,
            dt: userData.date.lastWeek,
            end_dt: userData.date.current,
          },
        })
        .then((response) => {
          setPastWeather({
            maxTemp: {
              maxTempC: Math.floor(response.data.forecast.forecastday[0].day.maxtemp_c),
              maxTempF: Math.floor(response.data.forecast.forecastday[0].day.maxtemp_f),
            },
            minTemp: {
              minTempC: Math.floor(response.data.forecast.forecastday[0].day.mintemp_c),
              minTempF: Math.floor(response.data.forecast.forecastday[0].day.mintemp_f),
            },
            temp: {
              tempC: Math.floor(response.data.forecast.forecastday[0].day.avgtemp_c),
              tempF: Math.floor(response.data.forecast.forecastday[0].day.avgtemp_f),
            },
            wind: {
              windMPH: Math.floor(response.data.forecast.forecastday[0].day.maxwind_mph),
              windKPH: Math.floor(response.data.forecast.forecastday[0].day.maxwind_kph),
            },
            humidity: Math.floor(response.data.forecast.forecastday[0].day.avghumidity),
            rainPercentage:
            Math.floor(response.data.forecast.forecastday[0].hour[12].chance_of_rain),
            condition: {
              text: response.data.forecast.forecastday[0].day.condition.text,
              icon: response.data.forecast.forecastday[0].day.condition.icon
            },
            uv: response.data.forecast.forecastday[0].day.uv,
            morningTemp: {
              minMorningTemp:{
                morningTempC:
                Math.floor(response.data.forecast.forecastday[0].hour[6].temp_c),
              morningTempF:
              Math.floor(response.data.forecast.forecastday[0].hour[6].temp_f),
              },
              maxMorningTemp:{
                morningTempC:
                Math.floor(response.data.forecast.forecastday[0].hour[11].temp_c),
              morningTempF:
              Math.floor(response.data.forecast.forecastday[0].hour[11].temp_f),
              }
            },
            afternoonTemp: {
              minAfternoonTemp:{
                afternoonTempC: Math.floor(response.data.forecast.forecastday[0].hour[12].temp_c),
                afternoonTempF: Math.floor(response.data.forecast.forecastday[0].hour[12].temp_f),
              },
              maxAfternoonTemp:{
                afternoonTempC: Math.floor(response.data.forecast.forecastday[0].hour[16].temp_c),
                afternoonTempF: Math.floor(response.data.forecast.forecastday[0].hour[16].temp_f),
              }
            },
            eveningTemp: {
              minEveningTemp:{
                eveningTempC: Math.floor(response.data.forecast.forecastday[0].hour[17].temp_c),
                eveningTempF: Math.floor(response.data.forecast.forecastday[0].hour[17].temp_f),
              },
              maxEveningTemp:{
                eveningTempC: Math.floor(response.data.forecast.forecastday[0].hour[23].temp_c),
                eveningTempF: Math.floor(response.data.forecast.forecastday[0].hour[23].temp_f),
              }
            },
            morningCondition: response.data.forecast.forecastday[0].hour[6].condition.icon,
            afternoonCondition: response.data.forecast.forecastday[0].hour[12].condition.icon,
            eveningCondition: response.data.forecast.forecastday[0].hour[17].condition.icon,
          });
          setIsPastSet(true)
          setIsPastLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData.status, searchPastLocation]);

  return {pastWeather, isPastSet, isPastLoading, setSearchPastLocation};
};
