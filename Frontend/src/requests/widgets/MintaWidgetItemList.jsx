import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import ManagerWidgetStaticPagination from "../../managers/widgets/ManagerWidgetStaticPagination";
import useStaticPagination from "../../utils/hooks/useStaticPagination";
import PropTypes from "prop-types";
import { useState } from "react";

const MintaWidgetItemList = ({ products, callback }) => {
  const itemPagination = useStaticPagination(products, products, 5);

  
  
  return (
    <Card>
      <Card.Body>
        <Card.Title>Items</Card.Title>
      </Card.Body>
      <Table striped borderless responsive hover>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Stock</th>
            <th>Qty Req</th>
            {callback && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {itemPagination.results.map((item, index) => (
            <tr key={item.id}>
              <td>{item.value.kode_item}</td>
              <td>{item.value.name_item}</td>
              <td>{item.value.stock_item}</td>
              <td>{item.value.qty}</td>

              {callback && (
                <td>
                  <Button
                    onClick={() => {
                      callback(item, index);
                    }}
                    size="sm"
                    variant="outined-danger"
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Card.Footer>
        <ManagerWidgetStaticPagination staticPagination={itemPagination} />
      </Card.Footer>
    </Card>
  );
};

MintaWidgetItemList.propTypes = {
  products: PropTypes.any,
  callback: PropTypes.func,
};

export default MintaWidgetItemList;
