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
import { FaWind, FaUmbrella, FaSpa, FaWater } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useFutureWeatherData } from "./utils/useFutureWeatherData";
import { usePastWeatherData } from "./utils/usePastWeatherData";
import { ForecastData } from "./types/ForecastData";
import { useUserData } from "./utils/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faCloudBolt } from "@fortawesome/free-solid-svg-icons";

export const App = () => {
  const { location, currentWeather, futureWeather, isFutureSet } =
    useFutureWeatherData();
  const { pastWeather, isPastSet } = usePastWeatherData();
  const userData = useUserData();

  useEffect(() => {
    if (isFutureSet && isPastSet) {
    }
  }, [isFutureSet, isPastSet]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Flex height={["90vh", "95vh"]} flexDirection="column" rowGap="1rem">
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
          <Flex flexDirection="column" h="100%" justify="space-around">
            <Flex flexDirection="column" rowGap="3rem" mb={["0", "5"]}>
              <Flex flexDirection="column" rowGap="2rem">
                <Flex flexDirection="column">
                  <Text
                    fontSize={["3xl", "5xl"]}
                  >{`${location?.region}, ${location?.country}`}</Text>
                  <Text fontSize={["sm", "xl"]}>
                    {userData.date.current.currentDisplay}
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-evenly">
                  <ChevronLeftIcon />
                  <Flex
                    flexDirection={["column", "row"]}
                    p={["0", "3"]}
                    ml={["0", "-10"]}
                    
                  >
                    <Flex p="7" columnGap="1rem" justify="space-between">
                      <Flex flexDirection="column" align="center">
                        <Image
                          boxSize={["100px", "150px"]}
                          src={currentWeather?.condition.icon}
                          alt="Dan Abramov"
                        />

                        <Text fontSize={["md", "2xl"]} mt={["-4"]}>
                          {currentWeather?.condition.text}
                        </Text>
                      </Flex>
                      <Flex
                        flexDirection="column"
                        pl={["0", "5"]}
                        pr={["0", "5"]}
                        alignItems="center"
                        justify="center"
                      >
                        <Text fontSize={["6xl", "8xl"]}>
                          {currentWeather?.temp.tempC}
                        </Text>
                        <Text fontSize={["xs", "md"]} mt={["-3", "-7"]}>
                          {currentWeather?.minTemp.minTempC}° /{" "}
                          {currentWeather?.maxTemp.maxTempC}°
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justify="space-evenly"
                      p="2"
                      flexDirection={["row", "column"]}
                    >
                      <Flex flexDirection="column" alignItems="center">
                        <FaWind color="gray.300" />
                        <Text fontSize="md">
                          <Flex alignItems="center" columnGap="3px">
                            <Text fontSize="xl">
                              {currentWeather?.wind.windMPH}
                            </Text>
                            <Text fontSize="xs">mph</Text>
                          </Flex>
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems="center">
                        <FontAwesomeIcon icon={faDroplet} />
                        <Text fontSize="md">
                          <Flex alignItems="center" columnGap="3px">
                            <Text fontSize="xl">
                              {currentWeather?.humidity}
                            </Text>
                            <Text fontSize="xs">%</Text>
                          </Flex>
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems="center">
                        <FaUmbrella color="gray.300" />
                        <Text fontSize="md">
                          <Flex alignItems="center" columnGap="3px">
                            <Text fontSize="xl">
                              {currentWeather?.rainPercentage}
                            </Text>
                            <Text fontSize="xs">%</Text>
                          </Flex>
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <ChevronRightIcon />
                </Flex>
              </Flex>
              <Flex justify="space-evenly">
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize={["50px", "100px"]}
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
                    boxSize={["50px", "100px"]}
                    src={currentWeather?.afternoonCondition}
                    alt="Dan Abramov"
                  />
                  <Text fontSize="xl">
                    {
                      currentWeather?.afternoonTemp.minAfternoonTemp
                        .afternoonTempC
                    }
                    ° /{" "}
                    {
                      currentWeather?.afternoonTemp.maxAfternoonTemp
                        .afternoonTempC
                    }
                    °
                  </Text>
                  <Text fontSize="lg">Afternoon</Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize={["50px", "100px"]}
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
            <Flex justify="center" alignItems="center" columnGap={["0.5rem"]}>
              <Text fontSize={["lg", "xl"]}>°F</Text>
              <Text fontSize={["3xl", "4xl"]} fontWeight="thin">
                |
              </Text>
              <Text fontSize={["lg", "xl"]}>°C</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
