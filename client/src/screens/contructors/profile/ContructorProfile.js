import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Card,
  Tag,
  Avatar,
  Typography,
  message,
} from "antd";
import "./profile.css";
import Rating from "./../../../components/utils/Rating";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { contractorFetch } from "./../../../redux/actions/contractorAction";
const ContructorProfile = ({ history }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
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

  const [contructor, setContructor] = useState({
    address: "",
    availableTime: [],
    createdAt: "",
    desc: "",
    disabled: false,
    email: "",
    featured: false,
    jobName: "",
    name: "",
    phone: "",
    photo: "",
    status: true,
    rate: 0,
  });

  const { contractors: allContractors } = useSelector(
    (state) => state.contractorFetch
  );

  const fetchContractor = () => {
    dispatch(contractorFetch());
  };

  const findContractorById = (id, contractors) => {
    const currentContractor = Array.from(contractors).find(
      (x) => String(x._id) === String(id)
    );
    if (currentContractor) {
      setContructor(currentContractor);
      console.log(currentContractor);
    } else {
      fetchContractor();
    }
  };

  useEffect(() => {
    findContractorById(id, allContractors);
  }, [id, allContractors]);

  const formatDateTime = (date) => {
    return `${date.split(" ")[0]}${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;
  };

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
            <Avatar size={100} src={contructor.photo} />
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
                <div className="col-sm-9 text-secondary">0</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Featued Status</div>
                <div className="col-sm-9 text-secondary">
                  {contructor.featured ? (
                    <Tag color="#1595e0">Featured</Tag>
                  ) : (
                    <Tag>General</Tag>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Join Date</div>
                <div className="col-sm-9 text-secondary">
                  {contructor.createdAt &&
                    moment(contructor.createdAt).format("LLL")}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">Hourly Rate</div>
                <div className="col-sm-9 text-secondary">
                  ${contructor.rate}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={14} lg={14}>
          <Row>
            <Col md={24} xs={24} sm={24} lg={24}>
              <Card title="description">{parser(contructor.desc)}</Card>
            </Col>
          </Row>
          <Card title="Schedule" style={{ marginTop: 10 }}>
            <Row>
              {contructor?.availableTime?.map((e, i) => (
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
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ContructorProfile;

const styles = {
  schedule: {
    display: "flex",
    justifyContent: "space-between",
    height: 40,
  },
};
