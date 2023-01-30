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
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { instance, URL } from "./api/instance";
import { useFutureWeatherData } from "./utils/useFutureWeatherData";

export const App = () => {
  const { location, futureWeather, currentWeather } = useFutureWeatherData();


  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>{location?.country}</Text>
            <Text>{currentWeather?.temp.tempC}</Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
