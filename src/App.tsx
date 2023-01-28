import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Spinner,
  Image
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useUserData } from "./utils/useUserData";

const instance = axios.create({
  headers: {
    "X-RapidAPI-Key": "ffa899c765msh8c6c4802415ff36p18a85ejsn5a1ca67e1269",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
});

const URL = "https://weatherapi-com.p.rapidapi.com";

export const App = () => {
  const userData = useUserData();
  useEffect(() => {
    if (!userData.status) {
      // instance
      //   .get(`${URL}/current.json`, {
      //     params: {
      //       q: `${userData.geolocation.lat},${userData.geolocation.long}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     setIcon(response.data.current.condition.icon)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [userData.status]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            {userData.status ? (
              <Spinner />
            ) : (
              <Fragment>
                <Text>Current Latitude: {userData.geolocation.lat}</Text>
                <Text>Current Longitude: {userData.geolocation.long}</Text>
                <Text>Current Date: {userData.date.current}</Text>
                <Text>Last Week Date: {userData.date.lastWeek}</Text>
              </Fragment>
            )}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
