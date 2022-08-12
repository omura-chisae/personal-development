import { memo, VFC } from "react";
import { Button, Table } from "react-bootstrap";

export const Log: VFC = memo(() => {
  return (
    <>
      <h4>過去の記録</h4>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>日付</th>
            <th>天気</th>
            <th>作業</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
});
