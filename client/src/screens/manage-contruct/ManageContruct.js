import React from "react";
import "./manageContruct.css";
import { Button, Table, Tag, PageHeader, Typography } from "antd";
import moment from "moment";
import { BsPlus } from "react-icons/bs";

const ManageContruct = ({ history }) => {
  const incomming = (x) => {
    var payments = x.filter((e) => e.in === true);
    return payments;
  };

  const calculateContructorPayble = (id) => {
    const row = data.find((x) => String(x._id) === String(id));
    const payments = row.payments.filter((e) => e.in === true);
    var totalPayment = 0;
    for (let payment of payments) {
      totalPayment += payment.amount;
    }
    let commission = parseFloat(
      (totalPayment / 100) * row.commissionRate
    ).toFixed(2);
    let contructorPaybleAmount = totalPayment - commission;
    return contructorPaybleAmount;
  };

  // const locationBreakDown = (x) => {
  //   let textArray = String(x).split(" ");
  //   let outputTextArray = [];
  //   textArray.forEach((e, i) => {
  //     if (i === 0) {
  //       var eachLine = <span>{e}</span>;
  //     } else {
  //       var eachLine =
  //         i % 6 === 0 ? (
  //           <>
  //             <span>{e}</span> <br />
  //           </>
  //         ) : (
  //           <span>{e}</span>
  //         );
  //     }

  //     outputTextArray.push(eachLine);
  //   });

  //   return outputTextArray;
  // };

  const data = [
    {
      _id: 1,
      serial: 1,
      client: { name: "Nahid", phone: "882 837 8473" },
      contructor: { name: "saif", phone: "126 364 7348" },
      location: `5th floor, House 39, Avenue-5,
block-A, Mirpur-6, Dhaka-1216`,
      payments: [
        { amount: 50, status: true, in: true, out: false },
        { amount: 30, status: true, in: true, out: false },
        { amount: 75, status: true, in: false, out: true },
      ],
      datetime: new Date(),
      // 1 = on going
      // 2 = completed
      // 3 = decline
      jobStatus: 1,
      commissionRate: 5,
      contructorPaid: false,
    },
  ];

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (x) => <>{x}</>,
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (x) => (
        <>
          <Typography>{x.name}</Typography>
          <Typography style={{ fontSize: 12 }}>{x.phone}</Typography>
        </>
      ),
    },
    {
      title: "Contractor",
      dataIndex: "contructor",
      render: (x) => (
        <>
          <Typography>{x.name}</Typography>
          <Typography style={{ fontSize: 12 }}>{x.phone}</Typography>
        </>
      ),
    },
    {
      title: "Job Location",
      dataIndex: "location",
      width: 250,
      render: (x) => <>{x}</>,
    },
    {
      title: "Time & Date",
      dataIndex: "datetime",
      render: (x) => <>{moment(x).format("LLL")}</>,
    },
    {
      title: "Total Cost",
      dataIndex: "payments",
      render: (x) => (
        <div
          style={{
            display: "flex",
            justifyContent: "",
            alignItems: "center",
          }}
        >
          {incomming(x).map((each, i) => {
            var addIcon = [];
            if (incomming(x).length === 2) {
              if (i === 1) {
                addIcon.push(<BsPlus key={i} />);
              }
            }
            return (
              <>
                {addIcon.map((icon) => (
                  <>{icon}</>
                ))}
                <Tag key={i} color="#1595e0">
                  ${each.amount}
                </Tag>
              </>
            );
          })}
        </div>
      ),
    },

    {
      title: "Job Status",
      dataIndex: "jobStatus",
      render: (x) => (
        <>
          {x === 1 ? (
            <Tag color="#1899e1" size="small">
              On-going
            </Tag>
          ) : x === 2 ? (
            <Tag color="green" size="small">
              Completed
            </Tag>
          ) : (
            <Tag color="#db4128" size="small">
              Declined
            </Tag>
          )}
        </>
      ),
    },

    {
      title: "Payable",
      dataIndex: "_id",
      render: (id) => (
        <Tag color="#1899e1">${calculateContructorPayble(id)}</Tag>
      ),
    },
    {
      title: "Release",
      dataIndex: "contructorPaid",
      render: (release) => (
        <>{release ? "released Done" : <Button size="small">Release</Button>}</>
      ),
    },
  ];

  // return <h1>Hello world</h1>;
  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        style={{ background: "#fff" }}
        title="Manage contracts"
      />
      <Table rowKey="_id" dataSource={data} columns={columns} />
    </>
  );
};

export default ManageContruct;
