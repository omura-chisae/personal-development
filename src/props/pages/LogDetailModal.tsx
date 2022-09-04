// @ts-nocheck

import { type } from "@testing-library/user-event/dist/type";
import { FC, memo, useState } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import { Diary } from "../../Types/Diary";

type Props = {
  show: boolean;
  onClickClose: () => void;
  diary: Diary | null;
};

export const LogDetailModal: FC<Props> = memo((props) => {
  const { show, onClickClose, diary } = props;
  // console.log(diary);
  if (diary != undefined) {
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
              <Modal.Title style={{ textAlign: "center" }}>
                {diary.date}　 {diary.weather}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>作業</h3>
              {diary.watering ? <Card body>水やり</Card> : null}

              {diary.fertilization ? <Card body>肥料</Card> : null}
              {diary.pesticide ? <Card body>農薬</Card> : null}

              <p>{diary.comment}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onClickClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  } else {
    <></>;
  }
});
