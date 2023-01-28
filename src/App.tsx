import * as React from "react";
import  { Fragment } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Spinner,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useUserData } from "./utils/useUserData";

export const App = () => {
  const userData = useUserData();
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
                <Text>Current Date: {userData.date}</Text>
              </Fragment>
            )}

          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
