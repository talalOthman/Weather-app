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

export const App = () => {
  const { location, currentWeather, futureWeather, isFutureSet } =
    useFutureWeatherData();
  const { pastWeather, isPastSet } = usePastWeatherData();
  // const [forecastWeek, setForecastWeek] = useState<ForecastData[]>([]);

  useEffect(() => {
    if (isFutureSet && isPastSet) {
      console.log(pastWeather);
      console.log(futureWeather);
      console.log(currentWeather);
    }
  }, [isFutureSet, isPastSet]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>{location?.country}</Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
