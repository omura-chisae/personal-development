import { FC, memo } from "react";
import { Button, Col } from "react-bootstrap";

type Props = {
  todo: string;
  completeButton: () => void;
};

export const ToDoCard: FC<Props> = memo((props) => {
  const { todo, completeButton } = props;
  console.log("レンダリング");

  return (
    <>
      <div key={todo} className="list-row">
        <Col>{todo}</Col>
        <Button onClick={completeButton}>完了</Button>
      </div>
    </>
  );
});
