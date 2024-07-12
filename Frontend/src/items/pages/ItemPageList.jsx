import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate } from "react-router-dom";
import useList from "../../utils/hooks/useList";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  NavLink,
} from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import {
 CREATE_ITEMS,
 UPDATE_ITEMS,
 DELETE_ITEMS
} from "../states/constants";
import useDetail from "../../utils/hooks/useDetail";
import useMessage from "../../utils/hooks/useMessage";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const ItemPageList = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const context = useContext(UtilStateContextBase);
  const itemList = useList(["items"]);
  const itemDelete = useDetail(["items"]);

  useEffect(() => {
    itemList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Item"}>
        <ManagerWidgetRBAC context={context} permissions={[CREATE_ITEMS]}>
          <Button onClick={() => navigate("new")}>New Item</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
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
                  <th>Kode Item</th>
                  <th>Nama Item</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemList.states.map((item) => (
                  <tr key={item._id}>
                    <td>{item.kode_item}</td>
                    <td>{item.name_item}</td>
                    <td>{item.stock_item}</td>
                    <td>
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[UPDATE_ITEMS]}
                        >
                          <NavLink
                            className={"text-secondary"}
                            href={`#/items/update/${item._id}`}
                          >
                          <MdModeEdit />
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[DELETE_ITEMS]}
                        >
                         <NavLink
                            className={"text-secondary"}
                          //  href={`#/products/delete/${products._id}`}
                          onClick={()=>{
                            message.confirmRemove(() => {
                              itemDelete.onDelete(item._id).then(()=>{
                                itemList.onAll()
                              })
                            })
                          }}
                          >
                          <MdDelete />
                          </NavLink>
                        </ManagerWidgetRBAC>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemPageList;
