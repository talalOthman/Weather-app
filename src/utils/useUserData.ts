import { useEffect, useState } from "react";

type UserData = {
  geolocation: {
    lat: number;
    long: number;
  };
  date: {
    current: string;
    lastWeek: string;
  };
  status: boolean;
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>({
    geolocation: {
      lat: 0,
      long: 0,
    },
    date: {
      current: "",
      lastWeek: "",
    },
    status: true,
  });

  useEffect(() => {
    const current = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);
    navigator.geolocation.getCurrentPosition((position) => {
      setUserData({
        geolocation: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
        date: {
          current: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
          lastWeek: `${lastWeek.getFullYear()}-${
            lastWeek.getMonth() + 1
          }-${lastWeek.getDate()}`,
        },
        status: false,
      });
    });
  }, []);

  return userData;
};
