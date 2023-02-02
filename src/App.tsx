import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Spinner,
  Image,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
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
  const userData = useUserData();

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
        <Flex height="100vh" flexDirection="column" rowGap="1rem">
          <Flex justify="flex-end" alignItems="center" p="2">
            <InputGroup w="10rem">
              <InputRightElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Search" variant="filled" />
            </InputGroup>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
          <Flex
            flexDirection="column"
            // border="1px"
            // borderColor="red"
            h="100%"
            justify="space-around"
          >
            <Flex flexDirection="column" rowGap="3rem">
              <Flex flexDirection="column" rowGap="2rem">
                <Flex flexDirection="column">
                  <Text fontSize="2xl">{`${location?.region}, ${location?.country}`}</Text>
                  <Text fontSize="sm">
                    {userData.date.current.currentDisplay}
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-evenly">
                  <ChevronLeftIcon color="gray.300" />
                  <Flex flexDirection="column">
                    <Flex p="5" columnGap="1rem" justify="space-between">
                      <Image
                        borderRadius="full"
                        boxSize="150px"
                        src={currentWeather?.condition.icon}
                        alt="Dan Abramov"
                      />

                      <Flex flexDirection="column" p="2">
                        <Text fontSize="5xl">
                          {currentWeather?.temp.tempC}°
                        </Text>
                        <Text fontSize="xl">
                          {currentWeather?.minTemp.minTempC}° /{" "}
                          {currentWeather?.maxTemp.maxTempC}°
                        </Text>
                        <Text fontSize="xl">{currentWeather?.condition.text}</Text>
                      </Flex>
                    </Flex>
                    <Flex justify="space-evenly" p="2">
                      <Flex flexDirection="column" alignItems='center'>
                        <CheckCircleIcon color="gray.300" />
                        <Text fontSize="md">
                          <Flex alignItems="center" columnGap='3px'>
                            <Text fontSize='xl'>{currentWeather?.wind.windMPH}</Text>
                            <Text fontSize="xs">mph</Text>
                          </Flex>
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems='center'>
                        <CheckCircleIcon color="gray.300" />
                        <Text fontSize="md">
                          <Flex alignItems="center" columnGap='3px'>
                            <Text fontSize='xl'>{currentWeather?.humidity}</Text>
                            <Text fontSize="xs">%</Text>
                          </Flex>
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems='center'>
                        <CheckCircleIcon color="gray.300" />
                        <Text fontSize="md">
                          <Flex alignItems="center" columnGap='3px'>
                            <Text fontSize='xl'>{currentWeather?.rainPercentage}</Text>
                            <Text fontSize="xs">%</Text>
                          </Flex>
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <ChevronRightIcon color="gray.300" />
                </Flex>
              </Flex>
              <Flex justify="space-evenly">
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={currentWeather?.morningCondition}
                    alt="Dan Abramov"
                  />
                  <Text fontSize="xl">
                    {currentWeather?.morningTemp.minMorningTemp.morningTempC}° /{" "}
                    {currentWeather?.morningTemp.maxMorningTemp.morningTempC}°
                  </Text>
                  <Text fontSize="lg">Morning</Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={currentWeather?.afternoonCondition}
                    alt="Dan Abramov"
                  />
                  <Text fontSize="xl">
                    {currentWeather?.afternoonTemp.minAfternoonTemp.afternoonTempC}° /{" "}
                    {currentWeather?.afternoonTemp.maxAfternoonTemp.afternoonTempC}°
                  </Text>
                  <Text fontSize="lg">Afternoon</Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={currentWeather?.eveningCondition}
                    alt="Dan Abramov"
                  />
                  <Text fontSize="xl">
                    {currentWeather?.eveningTemp.minEveningTemp.eveningTempC}° /{" "}
                    {currentWeather?.eveningTemp.maxEveningTemp.eveningTempC}°
                  </Text>
                  <Text fontSize="lg">Evening</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justify="center" alignItems="center" columnGap="0.5rem">
              <Text fontSize="lg">°F</Text>
              <Text fontSize="3xl">|</Text>
              <Text fontSize="lg">°C</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
