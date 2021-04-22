import React, { useState } from "react";
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
  List,
  Typography,
} from "antd";
import "./profile.css";
import Rating from "./../../../components/utils/Rating";

import parser from "html-react-parser";

const ContructorProfile = ({ history }) => {
  const ratingCount = (ratings) => {
    let totalRating = ratings.length;
    let ratingSum = 0;
    for (let rating of ratings) {
      ratingSum += rating.value;
    }
    return parseFloat(ratingSum / totalRating).toFixed(1);
  };

  const [contructor, setContructor] = useState({
    _id: 2,
    name: "Mamun Ar Ahamed",
    phone: "922 837 8473",
    email: "example@mail.com",
    address: `5th floor, House 39, Avenue-5,
block-A, Mirpur-6, Dhaka-1216`,
    joinDate: Date.now(),
    rating: [
      { value: 4.5, text: "nice Job" },
      { value: 3.5, text: "Great" },
      { value: 5, text: "Parfect" },
    ],

    jobName: "Handyman",
    desc:
      "crambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker includin",
    totalProject: 6,
    profilePhoto:
      "https://broom-service.herokuapp.com/assets/img/contractor-2.png",
    availableTime: ["10PM", "12PM", "6PM"],
    status: true,
  });

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        style={{ background: "#fff", marginBottom: 5 }}
        title="Details"
      />

      <Row gutter={[5, 5]}>
        <Col xs={24} sm={24} md={10} lg={10}>
          <Card className="__flex_center">
            <Avatar size={100} src={contructor.profilePhoto} />
            <span
              className="__flex_center"
              style={{ display: "block", width: "100%" }}
            >
              <Typography className="__name ptb5">{contructor.name}</Typography>
              <Typography className="ptb5">{contructor.jobName}</Typography>
              <Typography className="ptb5">{contructor.address}</Typography>
              <Button className="mtb5">Message</Button>
            </span>
          </Card>
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">Phone</div>
                <div className="col-sm-9 text-secondary">
                  {contructor.phone}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Email</div>
                <div className="col-sm-9 text-secondary">
                  {contructor.email}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Available Time</div>
                <div className="col-sm-9 text-secondary">
                  {contructor.availableTime.map((time) => (
                    <Tag color="#1595e0">{time}</Tag>
                  ))}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Rating</div>
                <div className="col-sm-9 text-secondary">
                  <Rating
                    value={ratingCount(contructor.rating)}
                    text=""
                    color="#db4128"
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Project Done</div>
                <div className="col-sm-9 text-secondary">120</div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={14} lg={14}>
          <Card title="description">{parser(contructor.desc)}</Card>
        </Col>
      </Row>
    </>
  );
};

export default ContructorProfile;
