import { FC, memo } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

type Props = {
  // onClickComplete: () => void;
  todos: any;
};

export const IncompleteTodo: FC<Props> = memo((props) => {
  const { todos } = props;

  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <CardHeader>ToDo</CardHeader>
      <Card.Body style={{ padding: "10px" }}>
        <Container>
          <Row
            className="todoContainer"
            // style={{
            //   backgroundColor: "#F7ECDE",
            // }}
          >
            {todos.map((todo: any, index: any) => {
              return (
                <div key={todo} className="list-row">
                  <Col>{todo}</Col>
                  <Button>完了</Button>
                </div>
              );
            })}

            {/* onClick={onClickComplete} */}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
});
