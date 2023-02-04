import { useEffect, useState } from "react";

type UserData = {
  geolocation: {
    lat: number;
    long: number;
  };
  date: {
    current: {
      currentNumeric: string,
      currentDisplay: string
    },
    lastWeek: string;
  };
  status: boolean;
};

export const useUserData = () => {
  const [displayDate, setDisplayDate] = useState<Date>(new Date())
  const [userData, setUserData] = useState<UserData>({
    geolocation: {
      lat: 0,
      long: 0,
    },
    date: {
      current: {
        currentNumeric: "",
        currentDisplay: ""
      },
      lastWeek: "",
    },
    status: true,
  });

  useEffect(() => {
    const current = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }; 
    
    // displayDate.setDate(displayDate.getDate() - 0); // will be used when the user decides to either go to past or future dates
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 2);
    navigator.geolocation.getCurrentPosition((position) => {
      setUserData({
        geolocation: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
        date: {
          current: {
            currentNumeric: `${current.getFullYear()}-${
              current.getMonth() + 1
            }-${current.getDate()}`,
            currentDisplay: displayDate.toLocaleDateString('en-us', {weekday: "long", month: 'long', day: 'numeric'})
          },
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
