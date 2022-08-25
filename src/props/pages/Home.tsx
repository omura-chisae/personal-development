import axios from "axios";
import { memo, useState, VFC } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { IncompleteTodo as IncompleteTodo } from "../organisms/IncompleteTodo";

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

var weather = "";
axios
  .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
  .then((res) => {
    // console.log(res.data[0].timeSeries[0].areas[0].area.name);
    // console.log(res.data[0].timeSeries[0].areas[0].weathers[1]);
    weather = res.data[0].timeSeries[0].areas[0].weathers[0];
  }) //アクセス成功
  .catch((err) => console.log(err)); //エラー

export const Home = memo(() => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([""]);

  const onClickTodoAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onChangeTodoText = (event: any) => setTodoText(event.target.value);

  return (
    <>
      <div className="inputArea">
        <div className="dateAndWeather">
          <u>
            <h4>{date}</h4>
            <h4>{weather}</h4>
          </u>
        </div>

        <div className="input">
          <Button variant="outline-primary">水やり</Button>
          <Button variant="outline-primary">肥料</Button>
          <Button variant="outline-primary">農薬</Button>

          <Form className="d-flex">
            <Form.Control
              type="content"
              placeholder="ToDoに追加"
              className="me-2"
              aria-label="Search"
              value={todoText}
              onChange={onChangeTodoText}
            />
            <Button variant="outline-success" onClick={onClickTodoAdd}>
              追加
            </Button>
          </Form>
        </div>

        <div className="textBoxs">
          <IncompleteTodo todos={incompleteTodos} />
          <Card style={{ width: "100%" }}>
            <CardHeader>今日の作業</CardHeader>
            <Card.Body></Card.Body>
          </Card>
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>コメント</CardHeader>
            <Card.Body></Card.Body>
          </Card>
        </div>
        <Button className="sendButton">送信</Button>
      </div>
    </>
  );
});
