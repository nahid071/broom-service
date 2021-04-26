import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  message,
  Switch,
  Avatar,
  Tag,
  DatePicker,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Days, Times } from "./../../../seeder/data";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload, uploadReset } from "./../../../redux/actions/UtilAction";
import moment from "moment";
import {
  contractorUpdate,
  contractorFetch,
} from "./../../../redux/actions/contractorAction";
import { useParams } from "react-router-dom";
const AddContructor = ({ history }) => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [contractor, setContractor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    jobName: "",
    desc: "",
    photo: "",
    availableTime: [],
    featured: false,
    rate: 0,
  });

  // Update State By Id
  const { id } = useParams();
  const { contractors: allContractors } = useSelector(
    (state) => state.contractorFetch
  );

  const findContractorById = (id, contractors) => {
    const currentContractor = Array.from(contractors).find(
      (x) => String(x._id) === String(id)
    );
    if (currentContractor) {
      setContractor((pre) => ({ ...pre, id, ...currentContractor }));
    } else {
      dispatch(contractorFetch());
    }
  };

  useEffect(() => {
    findContractorById(id, allContractors);
  }, [id, allContractors]);
  // End State Update

  const { uploading, done, url } = useSelector((state) => state.upload);
  const { success, error, loading } = useSelector(
    (state) => state.contractorUpdate
  );

  useEffect(() => {
    if (success) {
      message.success("Updated Successfully");
    }
    if (error !== null) {
      message.error(error);
    }
  }, [error, success]);

  useEffect(() => {
    if (done) {
      setContractor((pre) => ({ ...pre, photo: url }));
      // Dispatch Reset
      dispatch(uploadReset());
    }
  }, [done, dispatch]);

  const handleSubmit = () => {
    const {
      id,
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableTime,
      rate,
    } = contractor;

    if (!id || id === "") {
      message.error("Id Not Found ! Go Back and come back this page again");
    } else if (name === "") {
      message.error("name must not be empty !");
    } else if (phone === "") {
      message.error("phone must not be empty !");
    } else if (email === "") {
      message.error("email must not be empty !");
    } else if (address === "") {
      message.error("Address must not be empty !");
    } else if (jobName === "") {
      message.error("Job Name must not be empty !");
    } else if (desc === "") {
      message.error("Description must not be empty !");
    } else if (photo === "") {
      message.error("Photo must not be empty !");
    } else if (availableTime.length <= 0) {
      message.error("Select Available Time !");
    } else if (rate <= 0) {
      message.error("Hourly Rate ?");
    } else {
      // Submit
      dispatch(contractorUpdate({ ...contractor, id }));
    }
  };

  // Add Schedule
  const [schedules, setSchedules] = useState({
    date: "",
    times: [],
  });

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

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        style={{ background: "#fff" }}
        title="Update Contructor"
        key="1"
      />
      <div style={{ marginTop: "10px" }}></div>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Contructor Information">
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input
                  value={contractor.name}
                  onChange={(e) =>
                    setContractor((pre) => ({ ...pre, name: e.target.value }))
                  }
                  placeholder="name"
                />
              </Form.Item>
              <Form.Item label="Phone">
                <Input
                  type="number"
                  value={contractor.phone}
                  onChange={(e) =>
                    setContractor((pre) => ({ ...pre, phone: e.target.value }))
                  }
                  placeholder="428 431 538"
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  value={contractor.email}
                  onChange={(e) =>
                    setContractor((pre) => ({ ...pre, email: e.target.value }))
                  }
                  placeholder="example@example.com"
                />
              </Form.Item>
              <Form.Item label="Address">
                <Input
                  value={contractor.address}
                  onChange={(e) =>
                    setContractor((pre) => ({
                      ...pre,
                      address: e.target.value,
                    }))
                  }
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item label="Select Job">
                <Select
                  showSearch
                  value={contractor.jobName}
                  onSelect={(e) =>
                    setContractor((pre) => ({
                      ...pre,
                      jobName: e,
                    }))
                  }
                >
                  <Option key="Cleaning" value="Cleaning">
                    Cleaning
                  </Option>
                  <Option key="Gardening" value="Gardening">
                    Gardening
                  </Option>
                  <Option
                    key="Delivery & Transport"
                    value="Delivery & Transport"
                  >
                    Delivery & Transport
                  </Option>
                  <Option key="Handyman" value="Handyman">
                    Handyman
                  </Option>
                  <Option key="Plumbing" value="Plumbing">
                    Plumbing
                  </Option>
                  <Option key="Digital Service" value="Digital Service">
                    Digital Service
                  </Option>
                  <Option key="Removals" value="Removals">
                    Removals
                  </Option>
                  <Option key="General Maintenance" value="General Maintenance">
                    General Maintenance
                  </Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Add Schedule">
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
                  onChange={(e) =>
                    setSchedules((pre) => ({ ...pre, times: e }))
                  }
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
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Form layout="vertical">
              <Form.Item label="Description">
                <Editor
                  // initialValue={contractor.desc}
                  apiKey="yy95othwffaqkpskd5k5aqw8wu3wz0z8b1g526krzi2vh80j"
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                  }}
                  value={contractor.desc}
                  onEditorChange={(e) =>
                    setContractor((pre) => ({ ...pre, desc: e }))
                  }
                />
              </Form.Item>
              <Form.Item label="Current Photo">
                <Avatar size={64} shape="square" src={contractor.photo} />
              </Form.Item>
              <Form.Item label="Choose profile photo (500 X 400)px">
                <Input
                  onChange={(e) => {
                    dispatch(fileUpload(e.target.files[0]));
                  }}
                  type="file"
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item label="Hourly Rate">
                <Input
                  type="number"
                  value={contractor.rate}
                  onChange={(e) => {
                    setContractor((pre) => ({
                      ...pre,
                      featured: e.target.value,
                    }));
                  }}
                />
              </Form.Item>

              <Form.Item label="Featured">
                <Switch
                  checked={contractor.featured}
                  onChange={(e) => {
                    setContractor((pre) => ({ ...pre, featured: e }));
                  }}
                />
              </Form.Item>
              <Button loading={uploading || loading} onClick={handleSubmit}>
                update Completion
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddContructor;
const styles = {
  schedule: {
    display: "flex",
    justifyContent: "space-between",
    height: 40,
  },
};
