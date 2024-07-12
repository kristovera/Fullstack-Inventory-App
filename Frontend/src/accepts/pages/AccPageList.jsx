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
 CREATE_ACCEPTS,
 DELETE_ACCEPTS
} from "../states/constants";
import useDetail from "../../utils/hooks/useDetail";
import useMessage from "../../utils/hooks/useMessage";
import AccWidgetPreview from "../widgets/AccWidgetPreview";

import useFormat from "../../utils/hooks/useFormat";

const AccPageList = () => {
  const format = useFormat();
  const navigate = useNavigate();
  const message = useMessage();
  const context = useContext(UtilStateContextBase);
  const accList = useList(["accepts"]);
  const accDelete = useDetail(["accepts"]);

  useEffect(() => {
    accList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Penerima"}>
        <ManagerWidgetRBAC context={context} permissions={[CREATE_ACCEPTS]}>
          <Button onClick={() => navigate("new")}>New Data</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "name_item", text: "Name" }]}
                callback={(value) => {
                  accList.filter.current.field = value.field;
                  accList.filter.current.value = value.value;
                  accList.filter.current.page = 1;
                  accList.onAll();
                }}
              />
            </Card.Body>
            <Table striped borderless responsive hover>
              <thead>
                <tr>
                  <th>No Penerima</th>
                  <th>Tanggal</th>
                  <th>Nama Supplier</th>
                
              
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accList.states.map((a) => (
                  <tr key={a._id}>
                    <td>{a.no_acc}</td>
                    <td>{format.toDate(a.tgl_acc)}</td>
                    <td>{a.suppliers.name_supp}</td>
                
                    <td>
                    <AccWidgetPreview id={a._id} /> 
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[DELETE_ACCEPTS]}
                        >
                         <NavLink
                            className={"text-secondary"}
                          //  href={`#/products/delete/${products._id}`}
                          onClick={()=>{
                            message.confirmRemove(() => {
                              accDelete.onDelete(a._id).then(()=>{
                                accList.onAll()
                              })
                            })
                          }}
                          >
                            delete
                          </NavLink>
                        </ManagerWidgetRBAC>
                    
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

export default AccPageList;
