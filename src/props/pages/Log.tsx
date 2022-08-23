import { memo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { LogDetailModal } from "./LogDetailModal";

export const Log = memo(() => {
  const [show, setShow] = useState(false);

  const onClickLow = () => {
    setShow(true);
  };

  const onClickClose = () => {
    setShow(false);
  };

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
            <td>
              <button onClick={onClickLow}>Modal</button>
            </td>
            <td>8/15</td>
            <td>晴れ</td>
            <td>テスト</td>
          </tr>
          <tr>
            <td>2</td>
            <td>8/16</td>
            <td>晴れ</td>
            <td>テスト</td>
          </tr>
          <tr>
            <td>3</td>
            <td>8/17</td>
            <td>晴れ</td>
            <td>テスト</td>
          </tr>
        </tbody>
      </Table>
      <LogDetailModal show={show} onClickClose={onClickClose} />
    </>
  );
});
