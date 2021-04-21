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
} from "antd";
import moment from "moment";
import { BsEnvelopeOpen } from "react-icons/bs";
import { IoMailUnreadOutline, IoMailOutline } from "react-icons/io5";
const Messages = ({ history }) => {
  const [steeper, setSteeper] = useState(1);
  const unReadMessages = [
    {
      _id: 1,
      serial: 1,
      name: { fname: "faysal ", lname: "ahamed" },
      email: "saif@gmail.com",
      message: "test message",
      dateTime: Date.now(),
      readed: false,
    },
    {
      _id: 2,
      serial: 2,
      name: { fname: "Maria ", lname: "" },
      email: "maria@gmail.com",
      message: "I am message",
      dateTime: Date.now(),
      readed: false,
    },
    {
      _id: 3,
      serial: 3,
      name: { fname: "Nahiduzzaman ", lname: "khan" },
      email: "mdnahid071@gmail.com",
      message: "I am message from mine",
      dateTime: Date.now(),
      readed: false,
    },
  ];

  const ReadMessages = [
    {
      _id: 1,
      serial: 1,
      name: { fname: "saif ", lname: "ahamed" },
      email: "saif@gmail.com",
      message: "test message",
      dateTime: Date.now(),
      readed: true,
    },
    {
      _id: 2,
      serial: 2,
      name: { fname: "Mamun Ar ", lname: "Rashid" },
      email: "mamun@gmail.com",
      message: "I am message",
      dateTime: Date.now(),
      readed: true,
    },
  ];

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (x) => <>{x}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (x) => (
        <>
          {x.fname} {x.lname}
        </>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (x) => <>{x}</>,
    },

    {
      title: "Time",
      dataIndex: "dateTime",
      render: (x) => <>{moment(x).format("LLL")}</>,
    },
    {
      title: "Status",
      dataIndex: "readed",
      render: (x) => (
        <>
          {x ? (
            <Button icon={<IoMailUnreadOutline />} size="small"></Button>
          ) : (
            <Button icon={<IoMailOutline />} size="small"></Button>
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
        title="Messages"
      />
      <div className="withdraw__card">
        <div
          style={{ gridTemplateColumns: "1fr 1fr" }}
          className="withdraw__card__header"
        >
          <div
            onClick={() => setSteeper(1)}
            className={
              steeper === 1 ? "card__steeper active_stpper" : "card__steeper"
            }
          >
            New
          </div>
          <div
            onClick={() => setSteeper(2)}
            className={
              steeper === 2 ? "card__steeper active_stpper" : "card__steeper"
            }
          >
            viewed
          </div>
        </div>
      </div>
      {steeper === 1 && (
        <Table
          rowKey="_id"
          pagination={{
            size: "",
          }}
          dataSource={unReadMessages}
          columns={columns}
        />
      )}
      {steeper === 2 && (
        <Table
          rowKey="_id"
          pagination={{
            size: "",
          }}
          dataSource={ReadMessages}
          columns={columns}
        />
      )}
    </>
  );
};

export default Messages;
