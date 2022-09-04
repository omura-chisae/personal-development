import { useState } from "react";
import axios from "axios";

// type Weather ={}

export const useWeather = () => {
  const [weather, setWeather] = useState("");

  const getWeather = () => {
    axios
      .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
      .then((res) => {
        setWeather(res.data[0].timeSeries[0].areas[0].weathers[0]);
      }) //アクセス成功
      .catch((err) => console.log(err)); //エラー
    console.log(weather);
  };

  return [getWeather, weather];
};
