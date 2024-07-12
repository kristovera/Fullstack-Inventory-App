import { useEffect } from "react";
import useDetail from "../../utils/hooks/useDetail";
import { Form, InputGroup } from "react-bootstrap";
import { DEPT_DATA_INIT, DEPT_FIELD_GUIDE } from "../states/constants";

const DeptWidgetGetByKode = ({ callback }) => {
    const deptDetail = useDetail(['depts', 'by-kode'], DEPT_DATA_INIT, DEPT_FIELD_GUIDE);

    return (
        <Form.Group>
            <Form.Label>Departemen</Form.Label>
      <InputGroup className="mb-3">
        
        <Form.Control
          placeholder="Cari berdasarkan kode dept"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
                const value = e.target.value;
                deptDetail.onGet(value).then((data) => {
                    callback(data);
                });
            }
        }}
        />
        <InputGroup.Text className={deptDetail.state._id ? "bg-primary text-light" : "bg-secondary text-light" } id="basic-addon1">
            { deptDetail.state._id ? `${deptDetail.state.name_dept} / ${deptDetail.state.pimpinan}` : "No Dept" }
        </InputGroup.Text>
      </InputGroup>

           
        </Form.Group>
    )


}



export default DeptWidgetGetByKode;