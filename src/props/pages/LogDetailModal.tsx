import { type } from "@testing-library/user-event/dist/type";
import { memo } from "react";
import { Button, FloatingLabel, Form, Modal, Popover } from "react-bootstrap";

export const LogDetailModal = memo((props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            日付　天気
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>したこと</h4>
          <p>コメント</p>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
});
