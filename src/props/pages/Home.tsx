// @ts-nocheck

import axios from "axios";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Card, Collapse, Form } from "react-bootstrap";
import db from "../../firebase";
import CardHeader from "react-bootstrap/esm/CardHeader";

import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { IncompleteTodo as IncompleteTodo } from "../organisms/IncompleteTodo";
import { InputNewToDo } from "../organisms/InputNewToDo";

var weather: string = "";

export const Home: FC = memo(() => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([""]);

  const [todos, setTodos] = useState<any>([]);
  const [diaries, setDiaries] = useState<any>([]);
  const [comment, setComment] = useState("");
  const [watering, setWatering] = useState(false);
  const [fertilization, setFertilization] = useState(false);
  const [pesticide, setPesticide] = useState(false);
  const [weather, setWeather] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];

    let todayDate = "";
    setDate(
      today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate() +
        "/" +
        dayOfWeekStr
    );

    todayDate =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate() +
      "/" +
      dayOfWeekStr;

    const postData = collection(db, "diary");
    const q = query(postData, orderBy("timestamp", "desc"));

    // リアルタイムで取得（todo）
    onSnapshot(collection(db, "todo"), (post) => {
      setTodos(post.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    let latestDiary = {};
    // リアルタイムで取得(diary)
    onSnapshot(q, (post) => {
      setDiaries({ ...post.docs[0].data(), id: post.docs[0].id });
      latestDiary = post.docs[0].data();

      // 同日の日記があるか確認
      if (latestDiary.date == todayDate) {
        setComment(latestDiary.comment);
        setWatering(latestDiary.watering);
        setFertilization(latestDiary.fertilization);
        setPesticide(latestDiary.pesticide);
      }
    });

    // 天気の取得
    axios
      .get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
      .then((res) => {
        setWeather(res.data[0].timeSeries[0].areas[0].weathers[0]);
      }) //アクセス成功
      .catch((err) => console.log(err)); //エラー
  }, []);

  const onClickTodoAdd = (e) => {
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
  };

  const sendDiary = (e) => {
    e.preventDefault();

    console.log(diaries.id);

    if (diaries.date == date) {
      updateDoc(doc(db, "diary", diaries.id), {
        comment: comment,
        fertilization: fertilization,
        pesticide: pesticide,
        watering: watering,
      });
    } else {
      addDoc(collection(db, "diary"), {
        comment: comment,
        date: date,
        fertilization: fertilization,
        pesticide: pesticide,
        timestamp: serverTimestamp(),
        watering: watering,
        weather: weather,
      });
    }
  };

  const completeButton = useCallback((id: string) => {
    const targetId = id.target.id;

    console.log("完了ボタン");
    console.log(doc(db, "todo", targetId));

    updateDoc(doc(db, "todo", targetId), { isShow: false });
  }, []);
  const onChangeTodoText = (event: any) => setTodoText(event.target.value);
  const onChangeComment = (event: any) => setComment(event.target.value);

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
          <IncompleteTodo todos={todos} completeButton={completeButton} />
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>今日の作業</CardHeader>
            <Card.Body style={{ height: "240px" }}>
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
          <Card style={{ height: "100%", width: "100%" }}>
            <CardHeader>コメント</CardHeader>

            <Form.Control
              as="textarea"
              aria-label="First name"
              style={{ height: "240px" }}
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
