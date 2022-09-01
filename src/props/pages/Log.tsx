// @ts-nocheck

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { Button, Col, Dropdown, Table } from "react-bootstrap";
import db from "../../firebase";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LogDetailModal } from "./LogDetailModal";
import { getValue } from "@testing-library/user-event/dist/utils";

export const Log = memo(() => {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  const onClickLow = () => {
    setShow(true);
  };

  const onClickClose = () => {
    setShow(false);
  };

  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "diary");
    // getDocs(postData).then((snapShot) => {
    //   setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    // });

    // リアルタイムで取得
    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);
  console.log(posts[0]);

  return (
    <div style={{ padding: "30px" }}>
      <h4>過去の記録</h4>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          期間を選択
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
              <tr key={post.comment}>
                <td>
                  <button onClick={onClickLow}>詳細</button>
                </td>
                <td>{post.date}</td>
                <td>{post.weather}</td>
                <td>{post.comment}</td>
              </tr>
            );
          })}
          <tr>
            <td>
              <button onClick={onClickLow}>Modal</button>
            </td>
            <td>8/16</td>
            <td>晴れ</td>
            <td>テスト</td>
          </tr>
          <tr>
            <td>2</td>
            <td>8/16</td>
            <td>晴れ</td>
            <td>テスト</td>
          </tr>
          <tr>
            <td>3</td>
            <td>8/17</td>
            <td>晴れ</td>
            <td>テスト</td>
          </tr>
        </tbody>
      </Table>
      <LogDetailModal show={show} onClickClose={onClickClose} />
    </div>
  );
});
