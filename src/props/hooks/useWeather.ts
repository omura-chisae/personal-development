import axios from "axios";

// type Weather ={}

export const useWeather = () => {
  var weather: string = "";

  axios
    .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
    .then((res) => {
      // console.log(res.data[0].timeSeries[0].areas[0].area.name);
      // console.log(res.data[0].timeSeries[0].areas[0].weathers[1]);
      weather = res.data[0].timeSeries[0].areas[0].weathers[0];
    }) //アクセス成功
    .catch((err) => console.log(err)); //エラー
  console.log(weather);
  return weather;
};
