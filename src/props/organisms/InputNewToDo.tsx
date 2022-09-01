import { FC, memo } from "react";
import { Button, Form } from "react-bootstrap";

type Props = {
  todoText: string;
  onChangeTodoText: any;
  onClickTodoAdd: () => void;
};

export const InputNewToDo: FC<Props> = memo((props) => {
  const { todoText, onChangeTodoText, onClickTodoAdd } = props;
  console.log("レンダリング");

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="content"
          placeholder="ToDoに追加"
          className="me-2"
          aria-label="Search"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <Button variant="outline-success" onClick={onClickTodoAdd}>
          追加
        </Button>
      </Form>
    </>
  );
});
