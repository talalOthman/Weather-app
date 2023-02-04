import { useEffect, useState } from "react";
import { LocationData } from "../types/LocationData";
import { instance, URL } from "../api/instance";
import { useUserData } from "./useUserData";
import { ForecastData } from "../types/ForecastData";

export const useFutureWeatherData = () => {
  const [location, setLocation] = useState<LocationData>();
  const [futureWeather, setFutureWeather] = useState<ForecastData>();
  const [currentWeather, setCurrentWeather] = useState<ForecastData>();
  const [isFutureSet, setIsFutureSet] = useState<boolean>(true);
  const [isFutureLoading, setIsFutureLoading] = useState(false);
  const userData = useUserData();
  const [searchFutureLocation, setSearchFutureLocation] = useState<any>();

  useEffect(() => {
    setIsFutureLoading(true);
    setIsFutureSet(false);
    if (!userData.status) {
      instance
        .get(`${URL}/forecast.json`, {  
          params: {
            q: searchFutureLocation
              ? searchFutureLocation
              : `${userData.geolocation.lat},${userData.geolocation.long}`,
            days: 2,
          },
        })
        .then((response) => {
          setLocation({
            name: response.data.location.name,
            region: response.data.location.region,
            country: response.data.location.country,
          });

          setFutureWeather({
            maxTemp: {
              maxTempC: Math.floor(
                response.data.forecast.forecastday[1].day.maxtemp_c
              ),
              maxTempF: Math.floor(
                response.data.forecast.forecastday[1].day.maxtemp_f
              ),
            },
            minTemp: {
              minTempC: Math.floor(
                response.data.forecast.forecastday[1].day.mintemp_c
              ),
              minTempF: Math.floor(
                response.data.forecast.forecastday[1].day.mintemp_f
              ),
            },
            temp: {
              tempC: Math.floor(
                response.data.forecast.forecastday[1].day.avgtemp_c
              ),
              tempF: Math.floor(
                response.data.forecast.forecastday[1].day.avgtemp_f
              ),
            },
            wind: {
              windMPH: Math.floor(
                response.data.forecast.forecastday[1].day.maxwind_mph
              ),
              windKPH: Math.floor(
                response.data.forecast.forecastday[1].day.maxwind_kph
              ),
            },
            humidity: Math.floor(
              response.data.forecast.forecastday[1].day.avghumidity
            ),
            rainPercentage: Math.floor(
              response.data.forecast.forecastday[1].hour[12].chance_of_rain
            ),
            condition: {
              text: response.data.forecast.forecastday[1].day.condition.text,
              icon: response.data.forecast.forecastday[1].day.condition.icon,
            },
            uv: response.data.forecast.forecastday[1].day.uv,
            morningTemp: {
              minMorningTemp: {
                morningTempC: Math.floor(
                  response.data.forecast.forecastday[1].hour[6].temp_c
                ),
                morningTempF: Math.floor(
                  response.data.forecast.forecastday[1].hour[6].temp_f
                ),
              },
              maxMorningTemp: {
                morningTempC: Math.floor(
                  response.data.forecast.forecastday[1].hour[11].temp_c
                ),
                morningTempF: Math.floor(
                  response.data.forecast.forecastday[1].hour[11].temp_f
                ),
              },
            },
            afternoonTemp: {
              minAfternoonTemp: {
                afternoonTempC: Math.floor(
                  response.data.forecast.forecastday[1].hour[12].temp_c
                ),
                afternoonTempF: Math.floor(
                  response.data.forecast.forecastday[1].hour[12].temp_f
                ),
              },
              maxAfternoonTemp: {
                afternoonTempC: Math.floor(
                  response.data.forecast.forecastday[1].hour[16].temp_c
                ),
                afternoonTempF: Math.floor(
                  response.data.forecast.forecastday[1].hour[16].temp_f
                ),
              },
            },
            eveningTemp: {
              minEveningTemp: {
                eveningTempC: Math.floor(
                  response.data.forecast.forecastday[1].hour[17].temp_c
                ),
                eveningTempF: Math.floor(
                  response.data.forecast.forecastday[1].hour[17].temp_f
                ),
              },
              maxEveningTemp: {
                eveningTempC: Math.floor(
                  response.data.forecast.forecastday[1].hour[23].temp_c
                ),
                eveningTempF: Math.floor(
                  response.data.forecast.forecastday[1].hour[23].temp_f
                ),
              },
            },
            morningCondition:
              response.data.forecast.forecastday[1].hour[6].condition.icon,
            afternoonCondition:
              response.data.forecast.forecastday[1].hour[12].condition.icon,
            eveningCondition:
              response.data.forecast.forecastday[1].hour[17].condition.icon,
          });
          setCurrentWeather({
            maxTemp: {
              maxTempC: Math.floor(
                response.data.forecast.forecastday[0].day.maxtemp_c
              ),
              maxTempF: Math.floor(
                response.data.forecast.forecastday[0].day.maxtemp_f
              ),
            },
            minTemp: {
              minTempC: Math.floor(
                response.data.forecast.forecastday[0].day.mintemp_c
              ),
              minTempF: Math.floor(
                response.data.forecast.forecastday[0].day.mintemp_f
              ),
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
            rainPercentage: Math.floor(
              response.data.forecast.forecastday[0].hour[17].chance_of_rain
            ),
            condition: {
              text: response.data.current.condition.text,
              icon: response.data.current.condition.icon,
            },
            uv: response.data.current.uv,
            morningTemp: {
              minMorningTemp: {
                morningTempC: Math.floor(
                  response.data.forecast.forecastday[0].hour[6].temp_c
                ),
                morningTempF: Math.floor(
                  response.data.forecast.forecastday[0].hour[6].temp_f
                ),
              },
              maxMorningTemp: {
                morningTempC: Math.floor(
                  response.data.forecast.forecastday[0].hour[11].temp_c
                ),
                morningTempF: Math.floor(
                  response.data.forecast.forecastday[0].hour[11].temp_f
                ),
              },
            },
            afternoonTemp: {
              minAfternoonTemp: {
                afternoonTempC: Math.floor(
                  response.data.forecast.forecastday[0].hour[12].temp_c
                ),
                afternoonTempF: Math.floor(
                  response.data.forecast.forecastday[0].hour[12].temp_f
                ),
              },
              maxAfternoonTemp: {
                afternoonTempC: Math.floor(
                  response.data.forecast.forecastday[0].hour[16].temp_c
                ),
                afternoonTempF: Math.floor(
                  response.data.forecast.forecastday[0].hour[16].temp_f
                ),
              },
            },
            eveningTemp: {
              minEveningTemp: {
                eveningTempC: Math.floor(
                  response.data.forecast.forecastday[0].hour[17].temp_c
                ),
                eveningTempF: Math.floor(
                  response.data.forecast.forecastday[0].hour[17].temp_f
                ),
              },
              maxEveningTemp: {
                eveningTempC: Math.floor(
                  response.data.forecast.forecastday[0].hour[23].temp_c
                ),
                eveningTempF: Math.floor(
                  response.data.forecast.forecastday[0].hour[23].temp_f
                ),
              },
            },
            morningCondition:
              response.data.forecast.forecastday[0].hour[6].condition.icon,
            afternoonCondition:
              response.data.forecast.forecastday[0].hour[12].condition.icon,
            eveningCondition:
              response.data.forecast.forecastday[0].hour[17].condition.icon,
          });
          setIsFutureSet(true)
          setIsFutureLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
     
    }
  }, [userData.status, searchFutureLocation]);

  return {
    location,
    futureWeather,
    currentWeather,
    isFutureSet,
    isFutureLoading,
    setSearchFutureLocation,
  };
};
