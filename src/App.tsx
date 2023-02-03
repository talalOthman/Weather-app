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

export const App = () => {
  const {
    location,
    currentWeather,
    futureWeather,
    isFutureSet,
    isFutureLoading,
    setSearchLocation,
  } = useFutureWeatherData();
  const { pastWeather, isPastSet } = usePastWeatherData();
  const userData = useUserData();
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false); // false = celsius true = fahrenheit
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const changeToCelsius = () => {
    setIsFahrenheit(false);
    setIsCelsius(true);
  };

  const changeToFahrenheit = () => {
    setIsFahrenheit(true);
    setIsCelsius(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchLocation(event.target.value);
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
          {isFutureLoading ? (
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
                            {isCelsius
                              ? currentWeather?.temp.tempC
                              : currentWeather?.temp.tempF}
                          </Text>
                          <Text fontSize={["xs", "md"]} mt={["-3", "-7"]}>
                            {isCelsius
                              ? currentWeather?.minTemp.minTempC
                              : currentWeather?.minTemp.minTempF}
                            ° /{" "}
                            {isCelsius
                              ? currentWeather?.maxTemp.maxTempC
                              : currentWeather?.maxTemp.maxTempF}
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
                                  ? currentWeather?.wind.windKPH
                                  : currentWeather?.wind.windMPH}
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
                      {isCelsius
                        ? currentWeather?.morningTemp.minMorningTemp
                            .morningTempC
                        : currentWeather?.morningTemp.minMorningTemp
                            .morningTempF}
                      ° /{" "}
                      {isCelsius
                        ? currentWeather?.morningTemp.maxMorningTemp
                            .morningTempC
                        : currentWeather?.morningTemp.maxMorningTemp
                            .morningTempF}
                      °
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
                      {isCelsius
                        ? currentWeather?.afternoonTemp.minAfternoonTemp
                            .afternoonTempC
                        : currentWeather?.afternoonTemp.minAfternoonTemp
                            .afternoonTempF}
                      ° /{" "}
                      {isCelsius
                        ? currentWeather?.afternoonTemp.maxAfternoonTemp
                            .afternoonTempC
                        : currentWeather?.afternoonTemp.maxAfternoonTemp
                            .afternoonTempF}
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
                      {isCelsius
                        ? currentWeather?.eveningTemp.minEveningTemp
                            .eveningTempC
                        : currentWeather?.eveningTemp.minEveningTemp
                            .eveningTempF}
                      ° /{" "}
                      {isCelsius
                        ? currentWeather?.eveningTemp.maxEveningTemp
                            .eveningTempC
                        : currentWeather?.eveningTemp.maxEveningTemp
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
