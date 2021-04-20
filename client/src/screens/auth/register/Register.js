import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  Form,
  Input,
  Button,
  Select,
  Typography,
  message,
  Modal,
} from "antd";

import codes from "./../../../seeder/phoneCode";
import axios from "./../../../helper/axios";
import Loading from "./../../../components/utils/Loading";
import { signupAction } from "./../../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
const Register = ({ history }) => {
  // Step One Before Entering Phone
  const dispatch = useDispatch();
  const { Option } = Select;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [sended, setSended] = useState(false); // initially false
  // CountDown
  const [countdown, setCountdown] = useState(30);
  // Loading to send sms
  const [sending, setSending] = useState(false);
  const [tooManyTimeModal, setTooManyTimeModal] = useState(false);

  // After send Code Now Lets Verify And Do some another Staff
  const [inputOtp, setInputOtp] = useState("");
  const [verifing, setVerifing] = useState(false);
  const [verified, setVerified] = useState(false);

  // verified opt then password and confirm Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    loading: signUpProcessing,
    error: signupError,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (signupError && signupError !== null) {
      message.error(signupError);
    }
  }, [signupError, isAuthenticated, history]);

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

  const handleNameAndPhoneSubmit = async () => {
    if (name === "") {
      return message.error("Name must not be Empty !");
    }

    if (phone === "") {
      return message.error("Phone number must not be empty ");
    }
    var num;

    if (phone.length === 10) {
      if (countryCode === "+880") {
        num = "0" + phone;
      } else {
        num = phone;
      }
    } else {
      num = phone;
    }

    setSending(true);
    const { data: fetchIp } = await axios.get("https://jsonip.com/");
    if (fetchIp.ip) {
      const { data } = await axios.post("/sms/otp", { num, ip: fetchIp.ip });
      setSending(false);
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
    } else {
      message.success("Your IP Address Not  or Invalid");
    }
  };

  const verifyOtp = async () => {
    // Verify Otp
    var num;
    if (phone.length === 10) {
      if (countryCode === "+880") {
        num = "0" + phone;
      } else {
        num = phone;
      }
    } else {
      num = phone;
    }

    if (inputOtp === "") {
      message.error("type Otp");
    } else if (inputOtp.length < 4) {
      message.error("type 4-digit Otp");
    } else {
      // Lets Verify
      setVerifing(true);
      const { data } = await axios.post("/sms/otp/verify", {
        otp: inputOtp,
        num: num,
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

  const openAccount = () => {
    var num;
    if (phone.length === 10) {
      if (countryCode === "+880") {
        num = "0" + phone;
      } else {
        num = phone;
      }
    } else {
      num = phone;
    }

    if (password === "") {
      message.error("Password can't be blank");
    } else if (password.length < 6) {
      message.error("Password should be greater than six charecter");
    } else if (confirmPassword === "") {
      message.error("Re-type your password");
    } else if (password !== confirmPassword) {
      message.error("Password must be matched !");
    } else {
      // Submit for new Account
      // console.log(name, phone, password);
      dispatch(signupAction({ name, phone: num, password }));
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        showSearch
        onChange={(e) => setCountryCode(e)}
        defaultValue="+880"
        style={{ width: 80 }}
      >
        {codes.map((code) => (
          <Option key={code.dial_code} value={code.dial_code}>
            {code.dial_code}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div style={styles.container}>
        {!sended && (
          <Row>
            <Col>
              {sending && <Loading />}
              <Card title="It's quick and easy" className="auth_card">
                <Form layout="vertical">
                  <Form.Item label="Name">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mamun Ar Rashid"
                    />
                  </Form.Item>
                  <Form.Item label="Phone">
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="1XXXXXXXX"
                      addonBefore={prefixSelector}
                    />
                  </Form.Item>
                  <div id="recaptcha-container"></div>
                  <Button loading={sending} onClick={handleNameAndPhoneSubmit}>
                    Sign up
                  </Button>
                </Form>
                <Typography.Paragraph
                  style={styles.textCenter}
                  className="mt-2"
                >
                  Already Have Account <Link to="/">Login</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        )}

        {/* // After send Otp  */}
        {sended && !verified && (
          <Row>
            <Col>
              <Card className="auth_card">
                <h3 style={styles.pb20}>Verify your Phone Number</h3>
                <Typography.Text style={styles.blockAndPd10}>
                  Enter Your 4-digit code we sent to
                </Typography.Text>
                <Typography.Link style={styles.blockAndPd10}>
                  {phone}
                </Typography.Link>
                <Form>
                  <Form.Item>
                    <Input
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      placeholder="4-digit code"
                    />
                  </Form.Item>
                  <Form.Item style={styles.textRight}>
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
                    <Button style={styles.mr10}>Cancel</Button>
                    <Button loading={verifing} onClick={verifyOtp}>
                      Continue
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        )}

        {/* // after verified Otp then  */}
        {sended && verified && (
          <Row>
            <Col>
              <Card title="Set password for your Account" className="auth_card">
                <Form layout="vertical">
                  <Form.Item label="password">
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="confirm your password">
                    <Input.Password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item style={styles.textRight}>
                    <Button style={styles.mr10}>Cancel</Button>
                    <Button loading={signUpProcessing} onClick={openAccount}>
                      Complete
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        )}
      </div>
      {/* // TO Many Time Sent  MOdal  */}
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
  // After Entering Phone Verify Phone Number
};

export default Register;

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
  card: {
    minWidth: "400px",
  },
  pb20: {
    paddingBottom: "20px",
  },
  blockAndPd10: {
    display: "block",
    paddingBottom: "10px",
  },
  mr10: {
    marginRight: "10px",
  },
  textRight: {
    textAlign: "right",
  },
};
