import axios from "axios";
import { memo, VFC } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const today = new Date();
const dayOfWeek = today.getDay();
const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
const date =
  today.getFullYear() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getDate() +
  "/" +
  dayOfWeekStr;

window.onload = (event) => {
  console.log("天気取得");
  axios
    .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
    .then((res) => {
      console.log(res.data[0].timeSeries[0].areas[0].area.name);
      console.log(res.data[0].timeSeries[0].areas[0].weathers[1]);
    }) //アクセス成功
    .catch((err) => console.log(err)); //エラー
};

export const Home = memo(() => {
  return (
    <>
      <div className="inputArea">
        <div className="dateAndWeather">
          <h4>{date}</h4>
          <h4>天気</h4>
        </div>

        <div className="input">
          <Button variant="outline-primary">水やり</Button>
          <Button variant="outline-primary">肥料</Button>
          <Button variant="outline-primary">農薬</Button>
          <FloatingLabel
            controlId="floatingInput"
            label="内容"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <Button>ToDoに追加</Button>
        </div>

        <div className="textBoxs">
          <FloatingLabel
            controlId="floatingTextarea"
            label="ToDo"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "300px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="今日の作業"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "300px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="コメント"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "300px" }}
            />
          </FloatingLabel>
        </div>
        <Button className="sendButton">送信</Button>
      </div>
    </>
  );
});
