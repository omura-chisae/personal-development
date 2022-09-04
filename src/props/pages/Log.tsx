// @ts-nocheck

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { Card, Collapse, Dropdown, Table } from "react-bootstrap";
import db from "../../firebase";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LogDetailModal } from "./LogDetailModal";

import { useSelectDiary } from "../hooks/useSelectDiary";

export const Log: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [month, setMonth] = useState<null | string>([]);
  const { onSelectDiary, selectedDiary } = useSelectDiary();
  console.log(month);

  const onClickLow = useCallback(
    (id: string) => {
      const targetDate = id.target.id;
      const diaries = posts;
      console.log(targetDate);

      onSelectDiary({ targetDate, diaries });
      setShow(true);
    },

    [posts, onSelectDiary, show]
  );

  const onClickClose = useCallback(() => {
    setShow(false);
  }, []);

  const onClickDrop = () => {};

  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "diary");
    const q = query(postData, orderBy("timestamp", "desc"));

    let diary = [];
    const getMonth = [];
    // リアルタイムで取得
    onSnapshot(q, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
      console.log(post.docs.map((doc) => ({ ...doc.data() })));
      diary = post.docs.map((doc) => ({ ...doc.data() }));
      console.log();
      diary.map((value) => {
        if (
          getMonth.includes(
            `${value.date.split("/")[0]}/${value.date.split("/")[1]}`
          )
        ) {
        } else {
          getMonth.push(
            `${value.date.split("/")[0]}/${value.date.split("/")[1]}`
          );
        }

        setMonth(getMonth);
      });
    });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          期間を選択
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {month.map((value) => (
            <Dropdown.Item href="#/action-1" id={value} onClick={onClickDrop}>
              {value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>日付</th>
            <th>天気</th>
            <th>作業</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => {
            return (
              <tr key={post.date}>
                <td>
                  <button onClick={onClickLow} id={post.date}>
                    詳細
                  </button>
                </td>
                <td>{post.date}</td>
                <td>{post.weather}</td>
                <td style={{ display: "flex" }}>
                  <Collapse
                    in={post.watering}
                    style={{
                      marginBottom: "0",
                      width: "max-content",
                      textAlign: "center",
                      height: "100%",
                    }}
                  >
                    <Card
                      body
                      style={{ verticalAlign: "middle", padding: "0px" }}
                    >
                      水やり
                    </Card>
                  </Collapse>
                  <Collapse
                    in={post.fertilization}
                    style={{
                      marginBottom: "0",
                      width: "max-content",
                      textAlign: "center",
                    }}
                  >
                    <Card body>肥料</Card>
                  </Collapse>
                  <Collapse
                    in={post.pesticide}
                    style={{
                      marginBottom: "0",
                      width: "max-content",
                      textAlign: "center",
                    }}
                  >
                    <Card body>農薬</Card>
                  </Collapse>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <LogDetailModal
        show={show}
        onClickClose={onClickClose}
        diary={selectedDiary}
      />
    </div>
  );
});
