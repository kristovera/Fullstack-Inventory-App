import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import useDetail from "../../utils/hooks/useDetail";
import { ACCEPT_DATA_INIT } from "../states/constants";
import { Col, Form, NavLink, Row } from "react-bootstrap";
import AccWidgetItemList from "./AccWidgetItemList";

import useFormat from "../../utils/hooks/useFormat";

const AccWidgetPreview = ({ id }) => {
  const accDetail = useDetail(["accepts"], ACCEPT_DATA_INIT);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const format = useFormat();

  const onShow = () => {
    accDetail.onGet(id);
  };

  return (
    <>
      <NavLink onClick={handleShow} className={"text-secondary"}>
        Detail
      </NavLink>

      <Modal size="lg" onShow={onShow} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Penerima</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nomor Penerima</Form.Label>
                <Form.Control
                  name="no_acc"
                  type="text"
                  required
                  minLength={6}
                  maxLength={6}
                  disabled
                  value={accDetail.state.no_acc}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  name="tgl_acc"
                  disabled
                  required
                  value={format.toDate(accDetail.state.tgl_acc)}
                />
              </Form.Group>
            </Col>
            
            <Col>
              
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <AccWidgetItemList
                products={accDetail.state.products}
                callback={null}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

AccWidgetPreview.propTypes = {
  id: PropTypes.string,
};

export default AccWidgetPreview;
