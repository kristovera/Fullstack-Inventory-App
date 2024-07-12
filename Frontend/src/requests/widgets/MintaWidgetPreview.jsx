import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import useDetail from "../../utils/hooks/useDetail";
import { REQUEST_DATA_INIT } from "../states/constants";
import { Col, Form, NavLink, Row } from "react-bootstrap";
import MintaWidgetItemList from "./MintaWidgetItemList";
import useFormat from "../../utils/hooks/useFormat";

const MintaWidgetPreview = ({ id }) => {
const format = useFormat();
  const reqDetail = useDetail(["requests"], REQUEST_DATA_INIT);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onShow = () => {
    reqDetail.onGet(id);
  };

  return (
    <>
      <NavLink onClick={handleShow} className={"text-secondary"}>
        Detail
      </NavLink>

      <Modal size="lg" onShow={onShow} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Permintaan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nomor Permintaan</Form.Label>
                <Form.Control
                  name="no_req"
                  type="text"
                  required
                  minLength={6}
                  maxLength={6}
                  disabled
                  value={reqDetail.state.no_req}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  name="tgl_req"
                  disabled
                  required
                  value={format.toDate(reqDetail.state.tgl_req)}
                />
              </Form.Group>
            </Col>
            
            <Col>
              
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <MintaWidgetItemList
                products={reqDetail.state.products}
                callback={null}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

MintaWidgetPreview.propTypes = {
  id: PropTypes.string,
};

export default MintaWidgetPreview;
