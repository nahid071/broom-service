import React, { useState } from "react";
import { PageHeader, Button, Row, Col, Modal } from "antd";
import Dimension from "./../../../components/utils/windowDimension";

const MyComponent = ({ history }) => {
  const { width } = Dimension();

  return (
    <>
      <div className="remaneIt">
        <Row className="mb-10" gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <PageHeader
              ghost={false}
              onBack={() => history.goBack()}
              title="Total investment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;00 /="
              extra={[
                <Button
                  onClick={() => console.log(true)}
                  className="btn"
                  key="3"
                >
                  renameIt
                </Button>,
                <Button
                  onClick={() => console.log(true)}
                  className="btn"
                  key="2"
                >
                  renameIt
                </Button>,
              ]}
            />
          </Col>
        </Row>
      </div>

      {/* // Modal Initialization  */}
      {/* Add renameIt modal start */}
      <Modal
        title="modalTitle"
        centered
        visible={false}
        onOk={() => console.log("close Modal")}
        onCancel={() => console.log("close Modal")}
      >
        <p>Add Input</p>
      </Modal>
      {/* Add renameIt modal end */}
    </>
  );
};

export default MyComponent;
