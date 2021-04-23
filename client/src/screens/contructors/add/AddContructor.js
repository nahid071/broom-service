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
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Days, Times } from "./../../../seeder/data";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload, uploadReset } from "./../../../redux/actions/UtilAction";
import { contractorAdd } from "./../../../redux/actions/contractorAction";

const AddContructor = ({ history }) => {
  const [contractor, setContractor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    jobName: "",
    desc: "",
    photo: "",
    availableDay: "",
    availableTime: "",
    featured: false,
  });

  const dispatch = useDispatch();

  const { uploading, done, url } = useSelector((state) => state.upload);
  const { success, error, loading } = useSelector(
    (state) => state.contractorAdd
  );

  const resetContractor = () => {
    setContractor({
      name: "",
      phone: "",
      email: "",
      address: "",
      jobName: "",
      desc: "",
      photo: "",
      availableDay: "",
      availableTime: "",
      featured: false,
    });
  };

  useEffect(() => {
    if (success) {
      message.success("Added Successfully");
      resetContractor();
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
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableDay,
      availableTime,
      featured,
    } = contractor;

    if (name === "") {
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
    } else if (availableDay.length <= 0) {
      message.error("Select Available Days !");
    } else {
      // Submit
      dispatch(contractorAdd(contractor));
    }
  };

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        style={{ background: "#fff" }}
        title="Add Contructor"
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
              <Form.Item label="Job Name">
                <Input
                  value={contractor.jobName}
                  onChange={(e) =>
                    setContractor((pre) => ({
                      ...pre,
                      jobName: e.target.value,
                    }))
                  }
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item label="Available Day">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select available Days"
                  allowClear
                  onChange={(e) =>
                    setContractor((pre) => ({ ...pre, availableDay: e }))
                  }
                  options={Days.map((e) => ({ value: e }))}
                >
                  {/* {Days.map((e) => (
                    <Option key={e} value={e}>
                      {e}
                    </Option>
                  ))} */}
                  ;
                </Select>
                ,
              </Form.Item>
              <Form.Item label="Available Time">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select available time"
                  allowClear
                  options={Times.map((e) => ({ value: e }))}
                  onChange={(e) =>
                    setContractor((pre) => ({ ...pre, availableTime: e }))
                  }
                >
                  ;
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Form layout="vertical">
              <Form.Item label="Description">
                <Editor
                  initialValue=""
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
              <Form.Item label="Profile photo (500 X 400)px">
                <Input
                  onChange={(e) => {
                    dispatch(fileUpload(e.target.files[0]));
                  }}
                  type="file"
                  placeholder="..."
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
                Add Completion
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddContructor;
