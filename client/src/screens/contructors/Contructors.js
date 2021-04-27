import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  Table,
  Tag,
  Avatar,
  message,
  Badge,
  Row,
  Col,
  Card,
  Select,
  Modal,
  DatePicker,
} from "antd";
import Rating from "./../../components/utils/Rating";
import { FaCheck, FaRegEdit, FaXing } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrView, GrStatusDisabledSmall } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Days, Times } from "./../../seeder/data";
import {
  contractorFetch,
  contractorEnable,
  contractorDisable,
  contractorUpdate,
} from "./../../redux/actions/contractorAction";
import moment from "moment";
const Contructors = ({ history }) => {
  const dispatch = useDispatch();
  const [sheduleModal, setSheduleModal] = useState(false);
  const [contractor, setContractor] = useState(null);

  // Fetching
  const {
    contractors: allContractors,
    error: contractorFetchError,
    loading: contractorFetchLoading,
  } = useSelector((state) => state.contractorFetch);

  // schedule modal close
  const scheduleModalClose = () => {
    setContractor(null);
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

  const setStateContractorById = (id) => {
    const contractorById = Array.from(allContractors).find((x) =>
      String(x._id === String(id))
    );
    if (contractorById) {
      setContractor(contractorById);
    } else {
      setSheduleModal(false);
      message.error("Contractor is not editable !");
    }
  };

  const isDisabled = (id) => {
    const currentContractor = Array.from(contractors).find(
      (x) => String(x._id) === String(id)
    );

    return currentContractor.disabled;
  };

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

  // // Format Date & Time
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
          {formatDateTime(String(moment(x[0].date).format("LLLL")))}
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
              // setStateContractorById(x);

              setContractor(
                allContractors.find((a) => String(a._id) === String(x))
              );
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

  // customize contractor schedule
  // Add Schedule
  const [schedules, setSchedules] = useState({
    date: "",
    times: [],
  });

  const c = (date) => {
    return `${date.split(" ")[0]}${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;
  };

  const removeSchedule = (schedule, index) => {
    var newArray = [];
    Array.from(contractor.availableTime).forEach((e, i) => {
      if (i !== index) {
        newArray.push(e);
      }
    });
    setContractor((pre) => ({
      ...pre,
      availableTime: newArray,
    }));
  };

  const addSchedule = () => {
    // schedule
    if (schedules.date === "") {
      message.error("Please select a Date !");
    } else if (schedules.times.length <= 0) {
      message.error("Choose Sloot !");
    } else {
      setContractor((pre) => ({
        ...pre,
        availableTime: [...pre.availableTime, schedules],
      }));
      setSchedules({
        date: "",
        times: [],
      });
    }
  };

  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.contractorUpdate);

  useEffect(() => {
    if (updateSuccess) {
      message.success("updated successfully ");
      setSheduleModal(false);
      setContractor(null);
      dispatch(contractorFetch());
    }

    if (updateError !== null) {
      message.error(updateError);
    }
  }, [updateSuccess, updateError]);

  const ScheduleUpdateHandler = () => {
    const { _id, availableTime } = contractor;

    if (availableTime.length <= 0) {
      message.error("Select Available Time !");
    } else {
      // update
      dispatch(contractorUpdate({ ...contractor, id: _id }));
    }
  };

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

      <Modal
        title={`Customize Schedule of ${contractor?.name}`}
        visible={sheduleModal}
        onCancel={scheduleModalClose}
        footer={[
          <Button shape="dotted" key="1" onClick={scheduleModalClose}>
            Cancel
          </Button>,
          <Button
            loading={updateLoading}
            shape="dotted"
            key="2"
            onClick={ScheduleUpdateHandler}
          >
            Save
          </Button>,
        ]}
      >
        <Card>
          <Row gutter={[8, 8]}>
            <Col sm={10} xs={10} md={10} lg={10}>
              <DatePicker
                value={schedules.date}
                onChange={(e) => {
                  setSchedules((pre) => ({ ...pre, date: e }));
                }}
                style={{ width: "100%" }}
              />
            </Col>
            <Col sm={10} xs={10} md={10} lg={10}>
              <Select
                value={schedules.times}
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select available time"
                allowClear
                options={Times.map((e) => ({ value: e }))}
                onChange={(e) => setSchedules((pre) => ({ ...pre, times: e }))}
              >
                ;
              </Select>
            </Col>
            <Col sm={4} xs={4} md={4} lg={4}>
              <Button onClick={addSchedule}>Add</Button>
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            {contractor?.availableTime?.map((e, i) => (
              <Col md={24} xs={24} sm={24} lg={24} key={i}>
                <div style={styles.schedule}>
                  <div className="date">
                    {i + 1} ) &nbsp;&nbsp;&nbsp;{" "}
                    {formatDateTime(String(moment(e.date).format("LLLL")))}
                  </div>
                  <div className="times">
                    {e.times.map((each, index) => (
                      <Tag key={index} color="red">
                        {each}
                      </Tag>
                    ))}
                    <Button onClick={() => removeSchedule(e, i)} size="small">
                      X
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Modal>
    </>
  );
};

export default Contructors;

const styles = {
  schedule: {
    display: "flex",
    justifyContent: "space-between",
    height: 40,
  },
};
