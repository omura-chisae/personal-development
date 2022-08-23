import axios from "axios";
import { useState } from "react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

// type Weather ={}

const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [weathers, setWeathers] = useState();

  const getWeather = () => {
    console.log("天気取得");
    axios
      .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
      .then((res) => console.log(res));
  };
  return getWeather;
};
