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
CREATE_DEPTS,
UPDATE_DEPTS,
DELETE_DEPTS
} from "../states/constants";
import useDetail from "../../utils/hooks/useDetail";
import useMessage from "../../utils/hooks/useMessage";
import { FcFullTrash } from "react-icons/fc";
import { MdModeEdit } from "react-icons/md";

const DeptPageList = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const context = useContext(UtilStateContextBase);
  const deptList = useList(["depts"]);
  const deptDelete = useDetail(["depts"]);

  useEffect(() => {
    deptList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Departemen"}>
        <ManagerWidgetRBAC context={context} permissions={[CREATE_DEPTS]}>
          <Button onClick={() => navigate("new")}>New Departemen </Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "name_dept", text: "Name Departemen" }]}
                callback={(value) => {
                  deptList.filter.current.field = value.field;
                  deptList.filter.current.value = value.value;
                  deptList.filter.current.page = 1;
                  deptList.onAll();
                }}
              />
            </Card.Body>
            <Table striped borderless responsive hover>
              <thead>
                <tr>
                <th>Kode Departemen</th>
                  <th>Name Departemen</th>
                  <th>Pimpinan</th>
                  <th>No HP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deptList.states.map((dept) => (
                  <tr key={dept._id}>
                     <td>{dept.kode_dept}</td>
                    <td>{dept.name_dept}</td>
                    <td>{dept.pimpinan}</td>
                    <td>{dept.nohp_dept}</td>
                  
                    <td>
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[UPDATE_DEPTS]}
                        >
                          <NavLink
                            className={"text-secondary"}
                            href={`#/depts/update/${dept._id}`}
                          >
                          <MdModeEdit />
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[DELETE_DEPTS]}
                        >
                         <NavLink
                            className={"text-secondary"}
                          
                          onClick={()=>{
                            message.confirmRemove(() => {
                              deptDelete.onDelete(dept._id).then(()=>{
                                deptList.onAll()
                              })
                            })
                          }}
                          >
                            <FcFullTrash />
                           
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

export default DeptPageList;
