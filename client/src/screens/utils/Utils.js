import React from "react";
import {
  Button,
  PageHeader,
  Typography,
  Card,
  Form,
  Input,
  Row,
  Col,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import Avatar from "antd/lib/avatar/avatar";
const Utils = ({ history }) => {
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        style={{ background: "#fff", marginBottom: 10 }}
        title="Utils"
      />

      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="About section">
            <Form layout="vertical">
              <Form.Item label="Title">
                <Input />
              </Form.Item>
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
              <Form.Item label="Photo">
                <Input type="file" />
              </Form.Item>
              <Button type="dashed">Save</Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Preview">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Avatar
                  shape="square"
                  style={{ width: "100%", height: "auto" }}
                  src="http://broom-service.herokuapp.com/assets/img/about-left.png"
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <h1>About Broome Serices</h1>
                <Typography.Text>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet. Amet minim
                  mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                  Velit officia consequat duis enim velit mollit. Exercitation
                  veniam consequat sunt nostrud amet. Amet minim mollit non
                  deserunt ullamco est sit aliqua dolor do amet sint. Velit
                  officia consequat duis enim velit mollit. Exercitation veniam
                  consequat sunt nostrud amet.
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Utils;
