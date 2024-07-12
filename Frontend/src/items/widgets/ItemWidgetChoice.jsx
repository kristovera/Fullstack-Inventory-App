import { useEffect } from "react";
import useList from "../../utils/hooks/useList";
import { Button, Card, Table } from "react-bootstrap";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import { FaPlusCircle } from "react-icons/fa";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import PropTypes from "prop-types";

const ItemWidgetChoice = ({ callback }) => {
  const itemList = useList(["items"]);

  useEffect(() => {
    itemList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Item Choice</Card.Title>
        <ManagerWidgetFilter
          fields={[{ value: "name_item", text: "Name" }]}
          callback={(value) => {
            itemList.filter.current.field = value.field;
            itemList.filter.current.value = value.value;
            itemList.filter.current.page = 1;
            itemList.onAll();
          }}
        />
      </Card.Body>
      <Table striped borderless responsive hover>
        <thead>
          <tr>
          <th>Kode</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemList.states.map((i) => (
            <tr key={i._id}>
              <td>{i.kode_item}</td>
              <td>{i.name_item}</td>
              <td>{i.stock_item}</td>
              <td>
                <Button onClick={() => callback(i)} size="sm">
                  <FaPlusCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card.Footer>
        <ManagerWidgetPagination
          pagination={itemList.pagination}
          callback={(value) => {
            itemList.filter.current.page = value;
            itemList.onAll();
          }}
        />
      </Card.Footer>
    </Card>
  );
};

ItemWidgetChoice.propTypes = {
  callback: PropTypes.func,
};

export default ItemWidgetChoice;
