import { memo, VFC } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export const Home = memo(() => {
  return (
    <>
      <div>
        <div className="dateAndWeather">
          <h4>日付</h4>
          <h4>天気</h4>
        </div>

        <div className="inputs">
          <Button variant="outline-primary">ボタン</Button>
          <Button variant="outline-primary">ボタン</Button>
          <Button variant="outline-primary">ボタン</Button>
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
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="今日の作業"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="コメント"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
        </div>
        <Button className="sendButton">送信</Button>
      </div>
    </>
  );
});
