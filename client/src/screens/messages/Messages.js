import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { IoMailUnreadOutline, IoMailOutline } from "react-icons/io5";
import {
  messageFetch,
  messageUpdate,
} from "./../../redux/actions/messageAction";
const Messages = ({ history }) => {
  const [steeper, setSteeper] = useState(1);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messageFetch);

  const [ReadMessages, setReadMessages] = useState([]);
  const [unReadMessages, setUnReadMessages] = useState([]);

  const [allMessage, setAllMessage] = useState([]);

  useEffect(() => {
    dispatch(messageFetch());
  }, [dispatch]);
  const filterMessage = (msg) => {
    // Filtered messages
    setAllMessage(msg);
    const read = [];
    const unread = [];

    let serial = 0;
    Array.from(msg).forEach((e) => {
      if (!e.readed) {
        serial++;
        read.push({ ...e, serial });
      }
    });
    let i = 0;
    Array.from(msg).forEach((e) => {
      if (e.readed) {
        i++;
        unread.push({ ...e, serial: i });
      }
    });
    setReadMessages(read);
    setUnReadMessages(unread);
  };
  useEffect(() => {
    filterMessage(messages);
  }, [messages]);

  const { success, error, loading } = useSelector(
    (state) => state.messageUpdate
  );

  useEffect(() => {
    if (success) {
      message.success("Message Read successfull");
      dispatch(messageFetch());
    }

    if (error !== null) {
      message.error(error);
    }
  }, [success, error]);

  const actionButtonRenderer = (x) => {
    const currentMessage = allMessage.find((e) => String(e._id) === x);
    return currentMessage.readed ? (
      <Button icon={<IoMailUnreadOutline />} size="small"></Button>
    ) : (
      <Button
        loading={loading}
        onClick={() => dispatch(messageUpdate(x))}
        icon={<IoMailOutline />}
        size="small"
      ></Button>
    );
  };

  // messageFetch;
  // messageUpdate;

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
      dataIndex: "_id",
      render: (x) => <>{actionButtonRenderer(x)}</>,
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
          dataSource={ReadMessages}
          columns={columns}
        />
      )}
      {steeper === 2 && (
        <Table
          rowKey="_id"
          pagination={{
            size: "",
          }}
          dataSource={unReadMessages}
          columns={columns}
        />
      )}
    </>
  );
};

export default Messages;
