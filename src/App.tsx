import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Spinner,
  Image,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { FaWind, FaUmbrella } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useFutureWeatherData } from "./utils/useFutureWeatherData";
import { usePastWeatherData } from "./utils/usePastWeatherData";
import { useUserData } from "./utils/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { ForecastData } from "./types/ForecastData";

export const App = () => {
  const {
    location,
    futureWeather,
    currentWeather,
    isFutureLoading,
    isFutureSet,
    setSearchFutureLocation,
  } = useFutureWeatherData();
  const { pastWeather, isPastSet, isPastLoading, setSearchPastLocation } =
    usePastWeatherData();
  const [forecastData, setForecastData] = useState<any>([]);
  const [day, setDay] = useState<any>(1);
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const userData = useUserData();
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {
    const data = [pastWeather, currentWeather, futureWeather];
    setForecastData(data);
    setDay(1)
    setDisplayDate(new Date)
  }, [isFutureSet, isPastSet]);

  console.log(forecastData);

  const changeToCelsius = () => {
    setIsCelsius(true);
  };

  const changeToFahrenheit = () => {
    setIsCelsius(false);
  };

  const addDate = () =>{
    displayDate.setDate(displayDate.getDate() + 1)
    const newDate = displayDate
    setDisplayDate(newDate)   
  }

  const subtractDate = () =>{
    displayDate.setDate(displayDate.getDate() - 1)
    const newDate = displayDate
    setDisplayDate(newDate)   
  }

  const subtractDay = () => {
    if (day > 0) {
      const value = day - 1;
      setDay(value);  
      subtractDate()
    }
  };

  const addDay = () => {
    if (day < 2) {
      const value = day + 1;
      setDay(value);
      addDate()
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchFutureLocation(event.target.value);
      setSearchPastLocation(event.target.value);
    }, 2000);
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Flex height={["90vh"]} flexDirection="column" rowGap="1rem">
          <Flex justify="flex-end" alignItems="center" p="2">
            <InputGroup w="10rem">
              <InputRightElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                placeholder="Search"
                variant="filled"
                onChange={handleChange}
              />
            </InputGroup>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
          {isFutureLoading && isPastLoading ? (
            <Flex h="100%" alignItems="center" justify="center">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <Flex flexDirection="column" h="100%" justify="space-around">
              <Flex flexDirection="column" rowGap="2rem" mb={["0", "5"]}>
                <Flex flexDirection="column" rowGap="2rem">
                  <Flex flexDirection="column">
                    <Text
                      fontSize={["3xl", "5xl"]}
                    >{`${location?.region}, ${location?.country}`}</Text>
                    <Text fontSize={["sm", "xl"]}>
                      {displayDate.toLocaleDateString('en-us', {weekday: "long", month: 'long', day: 'numeric'})}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" justify="space-evenly">
                    <Link
                      onClick={subtractDay}
                      style={{ textDecoration: "none" }}
                    >
                      <ChevronLeftIcon />
                    </Link>
                    <Flex
                      flexDirection={["column", "row"]}
                      p={["0", "3"]}
                      ml={["0", "-10"]}
                    >
                      <Flex p="7" columnGap="1rem" justify="space-between">
                        <Flex flexDirection="column" align="center">
                          <Image
                            boxSize={["100px", "150px"]}
                            src={forecastData[day]?.condition.icon}
                            alt="Dan Abramov"
                          />

                          <Text fontSize={["md", "2xl"]} mt={["-2"]}>
                            {forecastData[day]?.condition.text}
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
                            {isCelsius
                              ? forecastData[day]?.temp.tempC
                              : forecastData[day]?.temp.tempF}
                          </Text>
                          <Text fontSize={["xs", "md"]} mt={["-3", "-7"]}>
                            {isCelsius
                              ? forecastData[day]?.minTemp.minTempC
                              : forecastData[day]?.minTemp.minTempF}
                            ° /{" "}
                            {isCelsius
                              ? forecastData[day]?.maxTemp.maxTempC
                              : forecastData[day]?.maxTemp.maxTempF}
                            °
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
                                {isCelsius
                                  ? forecastData[day]?.wind.windKPH
                                  : forecastData[day]?.wind.windMPH}
                              </Text>
                              <Text fontSize="xs">
                                {isCelsius ? "km/h" : "mph"}
                              </Text>
                            </Flex>
                          </Text>
                        </Flex>
                        <Flex flexDirection="column" alignItems="center">
                          <FontAwesomeIcon icon={faDroplet} />
                          <Text fontSize="md">
                            <Flex alignItems="center" columnGap="3px">
                              <Text fontSize="xl">
                                {forecastData[day]?.humidity}
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
                                {forecastData[day]?.rainPercentage}
                              </Text>
                              <Text fontSize="xs">%</Text>
                            </Flex>
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Link onClick={addDay} style={{ textDecoration: "none" }}>
                      <ChevronRightIcon />
                    </Link>
                  </Flex>
                </Flex>
                <Flex justify="space-evenly">
                  <Flex flexDirection="column" alignItems="center">
                    <Image
                      borderRadius="full"
                      boxSize={["50px", "100px"]}
                      src={forecastData[day]?.morningCondition}
                      alt="Dan Abramov"
                    />
                    <Text fontSize="xl">
                      {isCelsius
                        ? forecastData[day]?.morningTemp.minMorningTemp
                            .morningTempC
                        : forecastData[day]?.morningTemp.minMorningTemp
                            .morningTempF}
                      ° /{" "}
                      {isCelsius
                        ? forecastData[day]?.morningTemp.maxMorningTemp
                            .morningTempC
                        : forecastData[day]?.morningTemp.maxMorningTemp
                            .morningTempF}
                      °
                    </Text>
                    <Text fontSize="lg">Morning</Text>
                  </Flex>
                  <Flex flexDirection="column" alignItems="center">
                    <Image
                      borderRadius="full"
                      boxSize={["50px", "100px"]}
                      src={forecastData[day]?.afternoonCondition}
                      alt="Dan Abramov"
                    />
                    <Text fontSize="xl">
                      {isCelsius
                        ? forecastData[day]?.afternoonTemp.minAfternoonTemp
                            .afternoonTempC
                        : forecastData[day]?.afternoonTemp.minAfternoonTemp
                            .afternoonTempF}
                      ° /{" "}
                      {isCelsius
                        ? forecastData[day]?.afternoonTemp.maxAfternoonTemp
                            .afternoonTempC
                        : forecastData[day]?.afternoonTemp.maxAfternoonTemp
                            .afternoonTempF}
                      °
                    </Text>
                    <Text fontSize="lg">Afternoon</Text>
                  </Flex>
                  <Flex flexDirection="column" alignItems="center">
                    <Image
                      borderRadius="full"
                      boxSize={["50px", "100px"]}
                      src={forecastData[day]?.eveningCondition}
                      alt="Dan Abramov"
                    />
                    <Text fontSize="xl">
                      {isCelsius
                        ? forecastData[day]?.eveningTemp.minEveningTemp
                            .eveningTempC
                        : forecastData[day]?.eveningTemp.minEveningTemp
                            .eveningTempF}
                      ° /{" "}
                      {isCelsius
                        ? forecastData[day]?.eveningTemp.maxEveningTemp
                            .eveningTempC
                        : forecastData[day]?.eveningTemp.maxEveningTemp
                            .eveningTempF}
                      °
                    </Text>
                    <Text fontSize="lg">Evening</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justify="center" alignItems="center" columnGap={["0.5rem"]}>
                <Link
                  onClick={changeToFahrenheit}
                  fontSize={["lg", "xl"]}
                  style={{ textDecoration: "none" }}
                  fontWeight={isCelsius ? "normal" : "extrabold"}
                >
                  °F
                </Link>
                <Text fontSize={["3xl", "4xl"]} fontWeight="medium">
                  |
                </Text>
                <Link
                  onClick={changeToCelsius}
                  fontSize={["lg", "xl"]}
                  style={{ textDecoration: "none" }}
                  fontWeight={isCelsius ? "extrabold" : "normal"}
                >
                  °C
                </Link>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
