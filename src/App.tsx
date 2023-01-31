import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useFutureWeatherData } from "./utils/useFutureWeatherData";
import { usePastWeatherData } from "./utils/usePastWeatherData";
import { ForecastData } from "./types/ForecastData";
import { useUserData } from "./utils/useUserData";

export const App = () => {
  const { location, currentWeather, futureWeather, isFutureSet } =
    useFutureWeatherData();
  const { pastWeather, isPastSet } = usePastWeatherData();
  const userData = useUserData()
  // const [forecastWeek, setForecastWeek] = useState<ForecastData[]>([]);

  useEffect(() => {
    if (isFutureSet && isPastSet) {
      // console.log(pastWeather);
      // console.log(futureWeather);
      // console.log(currentWeather);
    }
  }, [isFutureSet, isPastSet]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Text>{`${location?.region}, ${location?.country}`}</Text>
          <Text>{userData.date.current.currentDisplay}</Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
