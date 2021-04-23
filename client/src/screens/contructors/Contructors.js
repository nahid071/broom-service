import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, Tag, Avatar, message } from "antd";
import Rating from "./../../components/utils/Rating";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrView, GrStatusDisabledSmall } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  contractorFetch,
  contractorEnable,
  contractorDisable,
} from "./../../redux/actions/contractorAction";
const Contructors = ({ history }) => {
  const dispatch = useDispatch();
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
    </>
  );
};

export default Contructors;
