// @ts-nocheck

import axios from "axios";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Card, Collapse, Form } from "react-bootstrap";
import db from "../../firebase";
import CardHeader from "react-bootstrap/esm/CardHeader";

import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { IncompleteTodo as IncompleteTodo } from "../organisms/IncompleteTodo";
import { InputNewToDo } from "../organisms/InputNewToDo";

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
var weather: string = "";

axios
  .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
  .then((res) => {
    // console.log(res.data[0].timeSeries[0].areas[0].area.name);
    // console.log(res.data[0].timeSeries[0].areas[0].weathers[1]);
    weather = res.data[0].timeSeries[0].areas[0].weathers[0];
  }) //アクセス成功
  .catch((err) => console.log(err)); //エラー

export const Home: FC = memo(() => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([""]);
  const [comment, setComment] = useState("");
  const [watering, setWatering] = useState(false);
  const [fertilization, setFertilization] = useState(false);
  const [pesticide, setPesticide] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "todo");
    // getDocs(postData).then((snapShot) => {
    //   setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    // });

    // リアルタイムで取得
    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const onClickTodoAdd = useCallback(
    (e) => {
      if (todoText === "") return;
      const newTodos = [...incompleteTodos, todoText];
      setIncompleteTodos(newTodos);
      // DBに追加する
      e.preventDefault();

      addDoc(collection(db, "todo"), {
        text: todoText,
        isShow: true,
      });
      setTodoText("");
    },
    [todoText, incompleteTodos, setIncompleteTodos]
  );

  const sendDiary = useCallback(
    (e) => {
      // DBに追加する
      e.preventDefault();

      addDoc(collection(db, "diary"), {
        comment: comment,
        date: date,
        fertilization: fertilization,
        pesticide: pesticide,
        timestamp: serverTimestamp(),
        watering: watering,
        weather: weather,
      });
    },
    [todoText, incompleteTodos, setIncompleteTodos]
  );

  const onChangeTodoText = (event: any) => setTodoText(event.target.value);

  const completeButton = () => {
    console.log(完了ボタン);
  };

  const onChangeComment = useCallback(
    (e: any) => {
      setComment(e.target.value);
    },
    [setComment]
  );

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
          <Button
            variant="outline-primary"
            onClick={() => {
              setWatering(!watering);
            }}
          >
            水やり
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              setFertilization(!fertilization);
            }}
          >
            肥料
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              setPesticide(!pesticide);
            }}
          >
            農薬
          </Button>

          <InputNewToDo
            todoText={todoText}
            onChangeTodoText={onChangeTodoText}
            onClickTodoAdd={onClickTodoAdd}
          />
        </div>

        <div className="textBoxs">
          <IncompleteTodo todos={posts} completeButton={completeButton} />
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>今日の作業</CardHeader>
            <Card.Body>
              <Collapse
                in={watering}
                style={{
                  marginBottom: "10px",
                  width: "max-content",
                  textAlign: "center",
                }}
              >
                <Card body>水やり</Card>
              </Collapse>

              <Collapse
                in={fertilization}
                style={{
                  marginBottom: "10px",
                  width: "max-content",
                  textAlign: "center",
                }}
              >
                <Card body>肥料</Card>
              </Collapse>

              <Collapse
                in={pesticide}
                style={{
                  marginBottom: "0px",
                  width: "max-content",
                  textAlign: "center",
                }}
              >
                <Card body>農薬</Card>
              </Collapse>
            </Card.Body>
          </Card>
          <Card style={{ height: "300px", width: "100%" }}>
            <CardHeader>コメント</CardHeader>

            <Form.Control
              aria-label="First name"
              style={{ height: "300px" }}
              value={comment}
              onChange={onChangeComment}
            />
          </Card>
        </div>
        <Button className="sendButton" onClick={sendDiary}>
          送信
        </Button>
      </div>
    </>
  );
});
