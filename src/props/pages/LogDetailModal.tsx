import { type } from "@testing-library/user-event/dist/type";
import { FC, memo, useState } from "react";
import { Button, FloatingLabel, Form, Modal, Popover } from "react-bootstrap";

type Props = {
  show: boolean;
  onClickClose: () => void;
};

export const LogDetailModal: FC<Props> = memo((props) => {
  const { show, onClickClose } = props;
  // const [show, setShow] = useState(false);
  // const onClickOpen = () => setShow(true);
  // const OnClickClose = () => setShow(false);
  return (
    <>
      <div>
        {/* <Button>ON</Button> */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
        >
          <Modal.Header closeButton onClick={onClickClose}>
            <Modal.Title id="contained-modal-title-vcenter">
              日付　天気
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>したこと</h4>
            <p>コメント</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClickClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
});
