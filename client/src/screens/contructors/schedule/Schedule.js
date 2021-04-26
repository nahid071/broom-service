import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
const Schedule = ({ sheduleModal, onClose, id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (sheduleModal) {
      setIsModalVisible(true);
    }
  }, [sheduleModal]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    onClose();
  };

  console.log(id);

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Schedule;
