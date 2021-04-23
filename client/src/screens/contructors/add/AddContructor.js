import React from "react";
import { PageHeader, Button, Row, Col, Card, Form, Input, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Days, Times } from "./../../../seeder/data";
const AddContructor = ({ history }) => {
  const { Option } = Select;
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
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
                <Input placeholder="name" />
              </Form.Item>
              <Form.Item label="Phone">
                <Input placeholder="428 431 538" />
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="example@example.com" />
              </Form.Item>
              <Form.Item label="Address">
                <Input placeholder="..." />
              </Form.Item>
              <Form.Item label="Job Name">
                <Input placeholder="..." />
              </Form.Item>
              <Form.Item label="Available Day">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="select available time"
                  onChange={(e) => console.log(e)}
                >
                  {Days.map((e) => (
                    <Option key={e} value={e}>
                      {e}
                    </Option>
                  ))}
                  ;
                </Select>
                ,
              </Form.Item>
              <Form.Item label="Available Time">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="select available time"
                  onChange={(e) => console.log(e)}
                >
                  {Times.map((e, i) => (
                    <Option key={i} value={e}>
                      {e}
                    </Option>
                  ))}
                  ;
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
