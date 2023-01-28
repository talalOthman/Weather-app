import { useEffect, useState } from "react";

type UserData = {
  geolocation: {
    lat: number;
    long: number;
  };
  date : string;
  status : boolean;
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>({
    geolocation: {
      lat: 0,
      long: 0,
    },
    date : "",
    status : true
  });

  useEffect(() => {
    const current = new Date();
    navigator.geolocation.getCurrentPosition((position) => {
      setUserData({
        geolocation: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
        date : `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`,
        status: false
      });
    });
  }, []);

  return userData;
};
