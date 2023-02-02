import { useEffect, useState } from "react";
import { LocationData } from "../types/LocationData";
import { instance, URL } from "../api/instance";
import { useUserData } from "./useUserData";
import { ForecastData } from "../types/ForecastData";

export const useFutureWeatherData = () => {
  const [location, setLocation] = useState<LocationData>();
  const [futureWeather, setFutureWeather] = useState<ForecastData[]>([]);
  const [currentWeather, setCurrentWeather] = useState<ForecastData>();
  const [isFutureSet, setIsFutureSet] = useState<boolean>(false)
  const userData = useUserData();

  useEffect(() => {
    if (!userData.status) {
      instance
        .get(`${URL}/forecast.json`, {
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
          setFutureWeather(updatedFutureWeather);
          setCurrentWeather({
            maxTemp: {
              maxTempC: Math.floor(response.data.forecast.forecastday[0].day.maxtemp_c),
              maxTempF: Math.floor(response.data.forecast.forecastday[0].day.maxtemp_f),
            },
            minTemp: {
              minTempC: Math.floor(response.data.forecast.forecastday[0].day.mintemp_c),
              minTempF: Math.floor(response.data.forecast.forecastday[0].day.mintemp_f),
            },
            temp: {
              tempC: Math.floor(response.data.current.temp_c),
              tempF: Math.floor(response.data.current.temp_f),
            },
            wind: {
              windMPH: Math.floor(response.data.current.wind_mph),
              windKPH: Math.floor(response.data.current.wind_kph),
            },
            humidity: Math.floor(response.data.current.humidity),
            rainPercentage:
            Math.floor(response.data.forecast.forecastday[0].hour[12].chance_of_rain),
            condition: {
              text: response.data.current.condition.text,
              icon: response.data.current.condition.icon
            },
            uv: response.data.current.uv,
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
                eveningTempF: Math.floor(response.data.forecast.forecastday[0].hour[17].temp_c),
              },
              maxEveningTemp:{
                eveningTempC: Math.floor(response.data.forecast.forecastday[0].hour[23].temp_c),
                eveningTempF: Math.floor(response.data.forecast.forecastday[0].hour[23].temp_c),
              }
            },
            morningCondition: response.data.forecast.forecastday[0].hour[6].condition.icon,
            afternoonCondition: response.data.forecast.forecastday[0].hour[12].condition.icon,
            eveningCondition: response.data.forecast.forecastday[0].hour[17].condition.icon,
          });
          setIsFutureSet(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData.status]);

  return { location, currentWeather, futureWeather, isFutureSet};
};
