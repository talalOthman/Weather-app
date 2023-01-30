import axios from "axios";

export const instance = axios.create({
    headers: {
      "X-RapidAPI-Key": "ffa899c765msh8c6c4802415ff36p18a85ejsn5a1ca67e1269",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  });

export const URL = "https://weatherapi-com.p.rapidapi.com";