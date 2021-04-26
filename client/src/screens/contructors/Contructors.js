import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, Tag, Avatar, message, Badge } from "antd";
import Rating from "./../../components/utils/Rating";
import { FaCheck, FaRegEdit, FaXing } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrView, GrStatusDisabledSmall } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  contractorFetch,
  contractorEnable,
  contractorDisable,
} from "./../../redux/actions/contractorAction";
import moment from "moment";
import Schedule from "./schedule";
const Contructors = ({ history }) => {
  const dispatch = useDispatch();
  const [sheduleModal, setSheduleModal] = useState(false);
  const [scheduleId, setScheduleId] = useState("");
  const handleScheduleClose = () => {
    setSheduleModal(false);
  };

  const ratingCount = (ratings) => {
    if (ratings === undefined || ratings === null) {
      return 0;
    }
    let totalRating = ratings.length;
    let ratingSum = 0;
    for (let rating of ratings) {
      ratingSum += rating.value;
    }
    return parseFloat(ratingSum / totalRating).toFixed(1);
  };

  const [contractors, setContractors] = useState([]);

  const isDisabled = (id) => {
    const currentContractor = Array.from(contractors).find(
      (x) => String(x._id) === String(id)
    );

    return currentContractor.disabled;
  };

  // Fetching
  const {
    contractors: allContractors,
    error: contractorFetchError,
    loading: contractorFetchLoading,
  } = useSelector((state) => state.contractorFetch);

  const fetchContractors = () => {
    dispatch(contractorFetch());
  };

  useEffect(() => {
    fetchContractors();
  }, []);

  useEffect(() => {
    if (allContractors) {
      const reverseContractors = Array.from(allContractors).reverse();
      setContractors(reverseContractors);
    }
    if (contractorFetchError !== null) {
      message.error(contractorFetchError);
    }
  }, [allContractors, contractorFetchError]);

  // Featured Enable
  const {
    success: featuredEnableSuccess,
    loading: featuredEnableLoading,
    error: featuredEnableError,
  } = useSelector((state) => state.contractorEnable);

  useEffect(() => {
    if (featuredEnableSuccess) {
      message.success("Featuerd Enabled Successfully");
      fetchContractors();
    }

    if (featuredEnableError !== null) {
      message.error(featuredEnableError);
    }
  }, [featuredEnableSuccess, featuredEnableError]);

  // Featured Disable
  const {
    success: featuredDisableSuccess,
    loading: featuredDisableLoading,
    error: featuredDisableError,
  } = useSelector((state) => state.contractorDisable);

  useEffect(() => {
    if (featuredDisableSuccess) {
      message.success("Featuerd Disabled Successfully");
      fetchContractors();
    }

    if (featuredDisableError !== null) {
      message.error(featuredDisableError);
    }
  }, [featuredDisableSuccess, featuredDisableError]);

  // Format Date & Time
  const formatDateTime = (date) => {
    return `${date.split(" ")[0]}${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;
  };

  // end
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      render: (x) => <Avatar size={50} src={x}></Avatar>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (x) => <>{x}</>,
    },

    {
      title: "Job Name",
      dataIndex: "jobName",
      render: (x) => <>{x}</>,
    },
    {
      title: "Next Available Time",
      dataIndex: "availableTime",
      render: (x) => (
        <>
          {Array.from(x).length > 0
            ? formatDateTime(String(moment(x[0].date).format("LLLL")))
            : ""}
          {/* {formatDateTime(String(moment(x[0].date).format("LLLL")))} */}
          &nbsp;&nbsp;&nbsp;
          {Array.from(x).length > 0 ? (
            <Tag color="red">{x[0].times[0]}</Tag>
          ) : (
            "not set"
          )}
        </>
      ),
    },
    {
      title: "New Schedule",
      dataIndex: "_id",
      render: (x) => (
        <>
          <Button
            onClick={() => {
              setScheduleId(x);
              setSheduleModal(true);
            }}
            style={{ background: "#3f51b5", color: "#fff" }}
            size="small"
          >
            &nbsp;create new
          </Button>
        </>
      ),
    },

    {
      title: "Project Completed",
      dataIndex: "totalProject",
      render: (x) => <>{0}</>,
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

          {isDisabled(x) ? (
            <Button
              key={x}
              loading={featuredDisableLoading}
              onClick={() => {
                dispatch(contractorDisable(x));
              }}
              icon={<GrStatusDisabledSmall style={{ color: "#db4128" }} />}
              size="small"
            ></Button>
          ) : (
            <Button
              key={x}
              loading={featuredEnableLoading}
              onClick={() => {
                dispatch(contractorEnable(x));
              }}
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
            <Button type="dashed" key="23423">
              Add Contructor
            </Button>
          </Link>,
        ]}
      />
      <Table
        loading={contractorFetchLoading}
        rowKey="_id"
        dataSource={contractors}
        columns={columns}
      />

      <Schedule
        id={scheduleId}
        onClose={handleScheduleClose}
        sheduleModal={sheduleModal}
      />
    </>
  );
};

export default Contructors;
