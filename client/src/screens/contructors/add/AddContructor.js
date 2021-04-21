import React from "react";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Table,
  DatePicker,
  Badge,
  Tag,
  Avatar,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
const AddContructor = ({ history }) => {
  const { Option } = Select;
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  const availavleTimes = [
    <Option key="1PM" value="1 PM">
      1 PM
    </Option>,
    <Option key="2PM" value="2 PM">
      2 PM
    </Option>,
    <Option key="3PM" value="3 PM">
      3 PM
    </Option>,
    <Option key="4PM" value="4 PM">
      4 PM
    </Option>,
    <Option key="5PM" value="5 PM">
      5 PM
    </Option>,
    <Option key="6PM" value="6 PM">
      6 PM
    </Option>,
    <Option key="7PM" value="7 PM">
      7 PM
    </Option>,
    <Option key="8PM" value="8 PM">
      8 PM
    </Option>,
    <Option key="9PM" value="9 PM">
      9 PM
    </Option>,
    <Option key="10PM" value="10 PM">
      10 PM
    </Option>,
    <Option key="11PM" value="11 PM">
      11 PM
    </Option>,
    <Option key="12PM" value="12 PM">
      12 PM
    </Option>,
    <Option key="1AM" value="1 AM">
      1 AM
    </Option>,
    <Option key="2AM" value="2 AM">
      2 AM
    </Option>,
    <Option key="3AM" value="3 AM">
      3 AM
    </Option>,
    <Option key="4AM" value="4 AM">
      4 AM
    </Option>,
    <Option key="5AM" value="5 AM">
      5 AM
    </Option>,
    <Option key="6AM" value="6 AM">
      6 AM
    </Option>,
    <Option key="7AM" value="7 AM">
      7 AM
    </Option>,
    <Option key="8AM" value="8 AM">
      8 AM
    </Option>,
    <Option key="9AM" value="9 AM">
      9 AM
    </Option>,
    <Option key="10AM" value="10 AM">
      10 AM
    </Option>,
    <Option key="11AM" value="11 AM">
      11 AM
    </Option>,
    <Option key="12AM" value="12 AM">
      12 AM
    </Option>,
  ];

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
                <Input placeholder="name" />
              </Form.Item>
              <Form.Item label="Phone">
                <Input placeholder="428 431 538" />
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="example@example.com" />
              </Form.Item>
              <Form.Item label="Available Time">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="select available time"
                  onChange={(e) => console.log(e)}
                >
                  {availavleTimes}
                </Select>
                ,
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
                  onEditorChange={handleEditorChange}
                />
              </Form.Item>
              <Form.Item label="Profile photo (500 X 400)px">
                <Input type="file" placeholder="..." />
              </Form.Item>
              <Button>Add Completion</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddContructor;
