import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UtilStateContextBase } from "../../utils/states/contexts";
import useList from "../../utils/hooks/useList";
import { Button, Card, Col, Container, Row, Table, NavLink } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_REQUESTS, DELETE_REQUESTS, UPDATE_REQUESTS } from "../states/constants";
import { READ_ITEMS } from "../../items/states/constants";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";

import MintaWidgetPreview from "../widgets/MintaWidgetPreview";
import useDetail from "../../utils/hooks/useDetail";
import useMessage from "../../utils/hooks/useMessage";
import React, { useState } from 'react';

import useFormat from "../../utils/hooks/useFormat";


const MintaPageList = ({ status }) => {
  const format = useFormat();

  const navigate = useNavigate();
  const context = useContext(UtilStateContextBase);
  const reqList = useList(["requests"]);

  const message = useMessage();
  const reqDelete = useDetail(["requests"]);




  useEffect(() => {
    reqList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [context.auth.isAuthenticated]);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Permintaan"}>
        <ManagerWidgetRBAC
          context={context}
          permissions={[CREATE_REQUESTS, READ_ITEMS]}
        >
          <Button onClick={() => navigate("new")}>New Data</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "no_req", text: "Nomor" }]}
                callback={(value) => {
                  reqList.filter.current.field = value.field;
                  reqList.filter.current.value = value.value;
                  reqList.filter.current.page = 1;
                  reqList.onAll();
                }}
              />
            </Card.Body>
            <Table striped borderless responsive hover>
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Nama Pimpinan</th>
                  <th>Nama Departemen</th>
                  <th>Tanggal</th>
                 

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reqList.states.map((r) => (
                  <tr key={r._id}>
                    <td>{r.no_req}</td>
                    <td>{r.depts.pimpinan}</td>
                    <td>{r.depts.name_dept}</td>
                    <td>{format.toDate(r.tgl_req)}</td>
                   


                    <td>
                      <MintaWidgetPreview id={r._id} />

                      <ManagerWidgetRBAC
                        context={context}
                        permissions={[DELETE_REQUESTS]}
                      >
                        <NavLink
                          className={"text-secondary"}
                          //  href={`#/products/delete/${products._id}`}
                          onClick={() => {
                            message.confirmRemove(() => {
                              reqDelete.onDelete(r._id).then(() => {
                                reqList.onAll()
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

            <Card.Footer>
              <ManagerWidgetPagination
                pagination={reqList.pagination}
                callback={(value) => {
                  reqList.filter.current.page = value;
                  reqList.onAll();
                }}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MintaPageList;
