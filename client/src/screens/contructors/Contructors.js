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
import moment from "moment";
import Rating from "./../../components/utils/Rating";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrView, GrStatusDisabledSmall } from "react-icons/gr";
const Contructors = ({ history }) => {
  const ratingCount = (ratings) => {
    let totalRating = ratings.length;
    let ratingSum = 0;
    for (let rating of ratings) {
      ratingSum += rating.value;
    }
    return parseFloat(ratingSum / totalRating).toFixed(1);
  };

  const data = [
    {
      _id: 1,
      name: "Alamgir Ahamed",
      joinDate: Date.now(),
      rating: [
        { value: 3.5, text: "nice Job" },
        { value: 1.5, text: "Great" },
        { value: 5, text: "Parfect" },
      ],
      jobName: "Plumber",
      desc: "so many",
      totalProject: 10,
      profilePhoto:
        "https://broom-service.herokuapp.com/assets/img/contractor-1.png",
      availableTime: ["10PM", "12PM", "6PM"],
      status: true,
    },
    {
      _id: 2,
      name: "Mamun Ar Ahamed",
      joinDate: Date.now(),
      rating: [
        { value: 4.5, text: "nice Job" },
        { value: 3.5, text: "Great" },
        { value: 5, text: "Parfect" },
      ],
      jobName: "Handyman",
      desc: "so many",
      totalProject: 6,
      profilePhoto:
        "https://broom-service.herokuapp.com/assets/img/contractor-2.png",
      availableTime: ["10PM", "12PM", "6PM"],
      status: true,
    },
    {
      _id: 3,
      name: "Md Nahiduzzaman",
      joinDate: Date.now(),
      rating: [
        { value: 4.5, text: "nice Job" },
        { value: 4.5, text: "Great" },
        { value: 5, text: "Parfect" },
      ],
      jobName: "Digital Service",
      desc: "so many",
      totalProject: 12,
      profilePhoto:
        "https://broom-service.herokuapp.com/assets/img/contractor-3.png",
      availableTime: ["10PM", "12PM", "6PM"],
      status: true,
    },
  ];

  const columns = [
    {
      title: "Photo",
      dataIndex: "profilePhoto",
      render: (x) => <Avatar size={50} src={x}></Avatar>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (x) => <>{x}</>,
    },
    {
      title: "Available Time",
      dataIndex: "availableTime",
      render: (x) => (
        <>
          {x.map((e, i) => (
            <Tag key={i}>{e}</Tag>
          ))}
        </>
      ),
    },

    {
      title: "Rating",
      dataIndex: "rating",

      render: (x) => (
        <>
          <Rating value={ratingCount(x)} text="" color="#db4128" />
        </>
      ),
    },
    {
      title: "Job Name",
      dataIndex: "jobName",
      render: (x) => <>{x}</>,
    },

    {
      title: "Project Completed",
      dataIndex: "totalProject",
      render: (x) => <>{x}</>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (x) => (
        <>
          <Link to={`/contructor/${x}/profile`}>
            <Button icon={<GrView />} size="small"></Button>
          </Link>
          <Link to={`/contructor/${x}/update`}>
            <Button icon={<FaRegEdit />} size="small"></Button>
          </Link>

          {x ? (
            <Button
              icon={<GrStatusDisabledSmall style={{ color: "#db4128" }} />}
              size="small"
            ></Button>
          ) : (
            <Button
              icon={<FaCheck style={{ color: "green" }} />}
              size="small"
            ></Button>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        style={{ background: "#fff" }}
        title="Contructors"
        extra={[
          <Link to="/contructors/add">
            <Button type="dashed" key="1">
              Add Contructor
            </Button>
          </Link>,
        ]}
      />
      <Table rowKey="_id" dataSource={data} columns={columns} />
    </>
  );
};

export default Contructors;
