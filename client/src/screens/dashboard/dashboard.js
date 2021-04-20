import React from "react";
import { Card, Col, Row, Table } from "antd";
const Dashboard = () => {
  const data = [
    {
      key: 1,
      time: "12/12/2021 10 PM",
      task: "new Savings Created",
      by: "md Nahiduzzaman",
    },
    {
      key: 2,
      time: "12/12/2021 10 PM",
      task: "new Savings Created",
      by: "Alamgir Ahamed",
    },
    {
      key: 3,
      time: "12/12/2021 10 PM",
      task: "new Savings Created",
      by: "saif ahamed",
    },
    {
      key: 4,
      time: "12/12/2021 10 PM",
      task: "new Savings Created",
      by: "alamgir ahamed saif",
    },
    {
      key: 5,
      time: "12/12/2021 10 PM",
      task: "new Savings Created",
      by: "samim khandaker",
    },
    {
      key: 6,
      time: "12/12/2021 10 PM",
      task: "new Savings Created",
      by: "Mamun ar rashid",
    },
  ];

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Created By",
      dataIndex: "by",
      key: "by",
      render: (text) => <span>{text}</span>,
    },
  ];
  return (
    <div className="dashboard">
      <div className="dashboard-branches">
        <Card
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Wellcome to Dashbaord</h2>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
