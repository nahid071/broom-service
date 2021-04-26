import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  Tag,
  Select,
  DatePicker,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Days, Times } from "./../../../seeder/data";
const Schedule = ({ sheduleModal, onClose, id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (sheduleModal) {
      setIsModalVisible(true);
    }
  }, [sheduleModal]);

  const handleOk = () => {
    setIsModalVisible(false);
    onClose();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    onClose();
  };

  // find contractors

  const [contractor, setContractor] = useState(null);
  // Fetching
  const { contractors } = useSelector((state) => state.contractorFetch);

  useEffect(() => {
    if (contractors) {
      if (id) {
        const contractorById = Array.from(contractors).find((x) =>
          String(x._id === String(id))
        );
        setContractor(contractorById);
      }
    }
  }, [contractors, id]);

  // Add Schedule
  const [schedules, setSchedules] = useState({
    date: "",
    times: [],
  });

  const formatDateTime = (date) => {
    return `${date.split(" ")[0]}${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;
  };

  const removeSchedule = (schedule, index) => {
    var newArray = [];
    Array.from(contractor.availableTime).forEach((e, i) => {
      if (i !== index) {
        newArray.push(e);
      }
    });
    setContractor((pre) => ({
      ...pre,
      availableTime: newArray,
    }));
  };

  const addSchedule = () => {
    // schedule
    if (schedules.date === "") {
      message.error("Please select a Date !");
    } else if (schedules.times.length <= 0) {
      message.error("Choose Sloot !");
    } else {
      setContractor((pre) => ({
        ...pre,
        availableTime: [...pre.availableTime, schedules],
      }));
      setSchedules({
        date: "",
        times: [],
      });
    }
  };

  return (
    <>
      <Modal
        title="Customize Schedule"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card>
          <Row gutter={[8, 8]}>
            <Col sm={10} xs={10} md={10} lg={10}>
              <DatePicker
                value={schedules.date}
                onChange={(e) => {
                  setSchedules((pre) => ({ ...pre, date: e }));
                }}
                style={{ width: "100%" }}
              />
            </Col>
            <Col sm={10} xs={10} md={10} lg={10}>
              <Select
                value={schedules.times}
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select available time"
                allowClear
                options={Times.map((e) => ({ value: e }))}
                onChange={(e) => setSchedules((pre) => ({ ...pre, times: e }))}
              >
                ;
              </Select>
            </Col>
            <Col sm={4} xs={4} md={4} lg={4}>
              <Button onClick={addSchedule}>Add</Button>
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            {contractor?.availableTime?.map((e, i) => (
              <Col md={24} xs={24} sm={24} lg={24} key={i}>
                <div style={styles.schedule}>
                  <div className="date">
                    {i + 1} ) &nbsp;&nbsp;&nbsp;{" "}
                    {formatDateTime(String(moment(e.date).format("LLLL")))}
                  </div>
                  <div className="times">
                    {e.times.map((each, index) => (
                      <Tag key={index} color="red">
                        {each}
                      </Tag>
                    ))}
                    <Button onClick={() => removeSchedule(e, i)} size="small">
                      X
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Modal>
    </>
  );
};

export default Schedule;

const styles = {
  schedule: {
    display: "flex",
    justifyContent: "space-between",
    height: 40,
  },
};
