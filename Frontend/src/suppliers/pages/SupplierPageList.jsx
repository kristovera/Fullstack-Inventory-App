import { useContext, useEffect, useRef } from "react";
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
  CREATE_SUPPLIERS,
  UPDATE_SUPPLIERS,
  DELETE_SUPPLIERS

} from "../states/constants";
import useDetail from "../../utils/hooks/useDetail";
import useMessage from "../../utils/hooks/useMessage";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";




const SupplierPageList = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const context = useContext(UtilStateContextBase);
  const  supplierList = useList(["suppliers"]);
  const supplierDelete = useDetail(["suppliers"]);
  




  useEffect(() => {
    supplierList.onAll();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Supplier"}>
        <ManagerWidgetRBAC context={context} permissions={[CREATE_SUPPLIERS]}>
          <Button onClick={() => navigate("new")}>New Supplier </Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "name_supp", text: "Name" }]}
                callback={(value) => {
                  supplierList.filter.current.field = value.field;
                  supplierList.filter.current.value = value.value;
                  supplierList.filter.current.page = 1;
                  supplierList.onAll();
                }}
              />
            </Card.Body>
            
            <Table  striped borderless responsive hover>
              <thead>
                <tr>
                <th>Kode Supplier</th>
                  <th>Name Supplier</th>
                  <th>Alamat</th>
                  <th>No HP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {supplierList.states.map((supplier) => (
                  <tr key={supplier._id}>
                     <td>{supplier.kode_supp}</td>
                    <td>{supplier.name_supp}</td>
                    <td>{supplier.alamat_supp}</td>
                    <td>{supplier.nohp_supp}</td>
                  
                    <td>
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[UPDATE_SUPPLIERS]}
                        >
                          <NavLink
                            className={"text-secondary"}
                            href={`#/suppliers/update/${supplier._id}`}
                          >
                            <MdEdit />
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[DELETE_SUPPLIERS]}
                        >
                         <NavLink
                            className={"text-secondary"}
                          
                          onClick={()=>{
                            message.confirmRemove(() => {
                              supplierDelete.onDelete(supplier._id).then(()=>{
                                supplierList.onAll()
                              })
                            })
                          }}
                          >
                            <FaTrash />
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

export default SupplierPageList;
