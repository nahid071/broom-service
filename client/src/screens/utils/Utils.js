import React, { useState, useEffect } from "react";
import {
  Button,
  PageHeader,
  Typography,
  Card,
  Form,
  Input,
  Row,
  Col,
  message,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  fileUpload,
  uploadReset,
  aboutFetch,
  aboutUpdate,
} from "./../../redux/actions/UtilAction";
import parser from "html-react-parser";
const Utils = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(aboutFetch());
  }, [dispatch]);

  const [about, setAbout] = useState({
    title: "",
    photo: "",
    desc: "",
  });

  // file upload
  const { uploading, done, url } = useSelector((state) => state.upload);
  useEffect(() => {
    if (done) {
      setAbout((pre) => ({ ...pre, photo: url }));
      dispatch(uploadReset());
    }
  }, [done, dispatch]);
  // file upload

  const { success, error, loading } = useSelector((state) => state.aboutUpdate);
  const { about: aboutData, loading: aboutFetching } = useSelector(
    (state) => state.aboutFetch
  );

  useEffect(() => {
    setAbout(aboutData);
  }, [aboutData]);

  useEffect(() => {
    if (success) {
      message.success(" Update successfull ");
      dispatch(aboutFetch());
    }
    if (error !== null) {
      message.success(error);
    }
  }, [success, error]);

  const handleUpdate = () => {
    const { title, photo, desc } = about;
    if (title === "") {
      message.error("title must not empty !");
    } else if (photo === "") {
      message.error("Photo must not empty !");
    } else if (desc === "") {
      message.error("Desc must not empty !");
    } else {
      dispatch(aboutUpdate(about));
    }
  };

  const handleEditorChange = (content, editor) => {
    setAbout((pre) => ({ ...pre, desc: content }));
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
                <Input
                  value={about.title}
                  onChange={(e) =>
                    setAbout((pre) => ({ ...pre, title: e.target.value }))
                  }
                />
              </Form.Item>
              <Form.Item label="Description">
                <Editor
                  value={about.desc}
                  apiKey="yy95othwffaqkpskd5k5aqw8wu3wz0z8b1g526krzi2vh80j"
                  init={{
                    height: 250,
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
                <Input
                  onChange={(e) => {
                    dispatch(fileUpload(e.target.files[0]));
                  }}
                  type="file"
                />
              </Form.Item>
              <Button
                onClick={handleUpdate}
                loading={loading || uploading}
                type="dashed"
              >
                Update
              </Button>
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
                  src={about.photo}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <h1>{about.title}</h1>
                <span>{parser(String(about.desc))}</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Utils;
