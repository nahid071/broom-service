import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  Form,
  Input,
  Switch,
  Button,
  Select,
  Typography,
  message,
  Modal,
  Alert,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken, signInAction } from "./../../../redux/actions/authAction";
import axios from "./../../../helper/axios";
const Login = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const countdownStart = () => {
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 1000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 2000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 3000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 4000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 5000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 6000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 7000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 8000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 9000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 10000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 11000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 12000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 13000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 14000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 15000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 16000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 17000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 18000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 19000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 20000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 21000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 22000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 23000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 24000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 25000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 26000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 27000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 28000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 29000);
    setTimeout(() => setCountdown((pre) => (pre = pre - 1)), 30000);
  };
  const [resetSection, setResetSection] = useState(false);
  const [optSending, setOptSending] = useState(false);
  const [tooManyTimeModal, setTooManyTimeModal] = useState(false);
  const [sended, setSended] = useState(false); // initially false
  const [countdown, setCountdown] = useState(30);

  const [lavel, setLavel] = useState("admin");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // set Verifying Loading
  const [verifing, setVerifing] = useState(false);
  const [verified, setVerified] = useState(false);

  // Otp For Verification
  const [inputOtp, setInputOtp] = useState("");
  const [changing, setChanging] = useState(false);
  const [changed, setChanged] = useState(false);

  // verified opt then password and confirm Password
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");

  // Login Check {after Refresh}
  const { token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && isAuthenticated === undefined) {
      dispatch(verifyToken());
    }
    // eslint-disable-next-line
  }, [token, isAuthenticated]);

  useEffect(() => {
    if (error && error !== null) {
      message.error(error);
    }
    if (isAuthenticated) {
      message.success("successfully sign in");
    }
  }, [error, isAuthenticated]);

  const LoginHandler = () => {
    if (lavel === "") {
      message.error("Select Access lavel");
    } else if (phone === "") {
      message.error("Type your Phone Number");
    } else if (password === "") {
      message.error("Type your Password");
    } else {
      // login
      dispatch(signInAction({ lavel, phone, password }));
    }
  };

  const sendOtp = async () => {
    setOptSending(true);
    const { data: fetchIp } = await axios.get("https://jsonip.com/");
    if (fetchIp.ip) {
      const { data } = await axios.post("/sms/otp/reset", {
        phone,
        ip: fetchIp.ip,
        lavel,
      });
      setOptSending(false);
      if (data.s) {
        message.success(data.e);
        setSended(true);
        countdownStart();
      }
      if (data.tooManyTime) {
        // Display Contact Info
        setTooManyTimeModal(true);
      }
      if (!data.tooManyTime && !data.s) {
        message.error(data.e);
        setSended(false);
      }
    }
  };

  const VerifiyOtp = async () => {
    // Verify Otp
    if (inputOtp === "") {
      message.error("type 4-digit otp");
    } else if (inputOtp.length < 4) {
      message.error("type 4-digit otp");
    } else {
      // Verify Otp
      setVerifing(true);
      const { data } = await axios.post("/sms/otp/reset/verify", {
        phone,
        otp: inputOtp,
      });
      setVerifing(false);
      if (data.s) {
        message.success(data.e);
        setVerified(true);
        // verified True
      } else {
        message.error(data.e);
      }
    }
  };

  const changePassword = async () => {
    if (resetPassword === "") {
      message.error("type your new password");
    } else if (resetConfirmPassword === "") {
      message.error("confirm your new password");
    } else if (resetPassword !== resetConfirmPassword) {
      message.error("new password and confirm new password dont matched !");
    } else {
      // do staffs
      setChanging(true);
      const { data } = await axios.post("/auth/reset", {
        lavel,
        phone,
        password: resetPassword,
      });
      setChanging(false);

      if (data.s) {
        setChanged(true);
        message.success("password reseted successfully");
      } else {
        setChanged(false);
        message.error(data.e);
      }
    }
  };

  return (
    <>
      <div style={styles.container}>
        {!resetSection ? (
          <Row>
            <Col>
              <Card title="Login to your Account" className="auth_card">
                <Form layout="vertical">
                  <Form.Item label="Phone">
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXX"
                    />
                  </Form.Item>
                  <Form.Item label="password">
                    <Input.Password
                      value={password}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          LoginHandler();
                        }
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Typography.Text>Forgor Password ? </Typography.Text>
                    <Typography.Link onClick={() => setResetSection(true)}>
                      {" "}
                      Reset now
                    </Typography.Link>
                  </Form.Item>
                  <Button loading={loading} onClick={LoginHandler}>
                    Login
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        ) : !sended ? (
          <Row>
            <Col>
              <Card title="Reset Password" className="auth_card">
                <Form layout="vertical">
                  <Form.Item label="Phone">
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXX"
                    />
                  </Form.Item>
                  <Button onClick={() => setResetSection(false)}>Cancel</Button>
                  <Button loading={optSending} onClick={sendOtp}>
                    Send Otp
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        ) : !verified ? (
          <Row>
            <Col>
              <Card title="Verify your Phone Number" className="auth_card">
                <Form layout="vertical">
                  <p>Enter Your 4-digit code we sent to</p>
                  <p> {phone}</p>

                  <Form.Item>
                    <Input
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      placeholder="4-digit otp"
                    />
                  </Form.Item>
                  {countdown === 0 ? (
                    <Button
                      onClick={() => {
                        // Some Reset to sent otp again
                        setCountdown(30);
                        setSended(false);
                      }}
                      style={styles.mr10}
                    >
                      Resend
                    </Button>
                  ) : (
                    <Typography.Text>
                      Resend code in {countdown}
                      &nbsp;&nbsp;&nbsp;
                    </Typography.Text>
                  )}

                  <Button
                    onClick={() => {
                      setResetSection(false);
                      setCountdown(30);
                      setSended(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button loading={verifing} onClick={VerifiyOtp}>
                    continue
                  </Button>
                </Form>
                <Typography.Paragraph
                  style={styles.textCenter}
                  className="mt-2"
                >
                  Don't have account !<Link to="/signup"> open a free one</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        ) : !changed ? (
          <Row>
            <Col>
              <Card title="Type your New Password" className="auth_card">
                <Form layout="vertical">
                  <Form.Item>
                    <Input.Password
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      placeholder="new password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input.Password
                      value={resetConfirmPassword}
                      onChange={(e) => setResetConfirmPassword(e.target.value)}
                      placeholder="confirm new password"
                    />
                  </Form.Item>
                  <Button
                    onClick={() => {
                      setResetSection(false);
                      setChanged(false);
                      setSended(false);
                      setVerified(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button loading={changing} onClick={changePassword}>
                    Change password
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        ) : (
          <Alert
            message="Your Password Successfully Reseted"
            type="success"
            showIcon
            action={
              <Button
                onClick={() => {
                  setResetSection(false);
                  setChanged(false);
                  setSended(false);
                  setVerified(false);
                  setCountdown(30);
                }}
                size="small"
                type="success"
              >
                back to login
              </Button>
            }
          />
        )}
      </div>

      <Modal
        title="Notice !"
        centered
        visible={tooManyTimeModal}
        onOk={() => setTooManyTimeModal(false)}
        onCancel={() => setTooManyTimeModal(false)}
        style={styles.textCenter}
      >
        <Typography.Text>
          We have sent otp too many Times <br />
          <br />
        </Typography.Text>
        <Typography.Text>Please Contact +88017 07 801068</Typography.Text>
      </Modal>
    </>
  );
};

export default Login;

const styles = {
  container: {
    width: "100%",
    height: "80vh",
    display: "grid",
    placeContent: "center",
  },

  textCenter: {
    textAlign: "center",
  },
};
