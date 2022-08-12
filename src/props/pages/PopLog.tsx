import { memo, VFC } from "react";
import { FloatingLabel, Form, Popover } from "react-bootstrap";

export const PopLog = memo(() => {
  return (
    <>
      <Popover id="popover-basic">
        <Popover.Header as="h3">日付　天気</Popover.Header>
        <Popover.Body>
          <FloatingLabel
            controlId="floatingTextarea"
            label="作業"
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
        </Popover.Body>
      </Popover>
    </>
  );
});
