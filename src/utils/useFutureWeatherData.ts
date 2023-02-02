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
          setFutureWeather(updatedFutureWeather);
          setCurrentWeather({
            maxTemp: {
              maxTempC: response.data.forecast.forecastday[0].day.maxtemp_c,
              maxTempF: response.data.forecast.forecastday[0].day.maxtemp_f,
            },
            minTemp: {
              minTempC: response.data.forecast.forecastday[0].day.mintemp_c,
              minTempF: response.data.forecast.forecastday[0].day.mintemp_f,
            },
            temp: {
              tempC: response.data.current.temp_c,
              tempF: response.data.current.temp_f,
            },
            wind: {
              windMPH: response.data.current.wind_mph,
              windKPH: response.data.current.wind_kph,
            },
            humidity: response.data.current.humidity,
            rainPercentage:
              response.data.forecast.forecastday[0].hour[12].chance_of_rain,
            condition: response.data.current.condition.text,
            uv: response.data.current.uv,
            morningTemp: {
              morningTempC:
                response.data.forecast.forecastday[0].hour[6].temp_c,
              morningTempF:
                response.data.forecast.forecastday[0].hour[6].temp_f,
            },
            afternoonTemp: {
              afternoonTempC:
                response.data.forecast.forecastday[0].hour[12].temp_c,
              afternoonTempF:
                response.data.forecast.forecastday[0].hour[12].temp_f,
            },
            eveningTemp: {
              eveningTempC:
                response.data.forecast.forecastday[0].hour[17].temp_c,
              eveningTempF:
                response.data.forecast.forecastday[0].hour[17].temp_f,
            },
            nightTemp: {
              nightTempC: response.data.forecast.forecastday[0].hour[21].temp_c,
              nightTempF: response.data.forecast.forecastday[0].hour[21].temp_f,
            },
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
