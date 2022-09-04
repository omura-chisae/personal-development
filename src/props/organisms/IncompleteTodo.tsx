import { FC, memo } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

type Props = {
  todos: any;
  completeButton: () => void;
};

export const IncompleteTodo: FC<Props> = memo((props) => {
  const { todos, completeButton } = props;

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader>ToDo</CardHeader>
      <Card.Body style={{ minHeight: "240px", padding: "10px" }}>
        <Container>
          <Row className="todoContainer">
            {todos.map((post: any) => {
              return post.isShow ? (
                <div key={post.id} className="list-row">
                  <Col>{post.text}</Col>
                  <Button onClick={completeButton} id={post.id}>
                    完了
                  </Button>
                </div>
              ) : null;
            })}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
});
