import { useEffect } from "react";
import useDetail from "../../utils/hooks/useDetail";
import { Form, InputGroup } from "react-bootstrap";
import { SUPPLIER_DATA_INIT, SUPPLIER_FIELD_GUIDE} from "../states/constants";

const SuppWidgetGetByKode = ({ callback }) => {
    const suppDetail = useDetail(['suppliers', 'by-kode'], SUPPLIER_DATA_INIT, SUPPLIER_FIELD_GUIDE);

    return (
        <Form.Group>
            <Form.Label>Supplier</Form.Label>
      <InputGroup className="mb-3">
        
        <Form.Control
          placeholder="Cari berdasarkan kode supplier"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
                const value = e.target.value;
                suppDetail.onGet(value).then((data) => {
                    callback(data);
                });
            }
        }}
        />
        <InputGroup.Text className={suppDetail.state._id ? "bg-primary text-light" : "bg-secondary text-light" } id="basic-addon1">
            { suppDetail.state._id ? `${suppDetail.state.name_supp} ` : "Kode Supplier" }
        </InputGroup.Text>
      </InputGroup>

           
        </Form.Group>
    )


}



export default SuppWidgetGetByKode;