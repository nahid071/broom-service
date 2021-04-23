// import Login from "./Login";
// export default Login;

import React, { useState, useEffect } from "react";
import { Button, Typography, message, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken, signInAction } from "./../../../redux/actions/authAction";
import axios from "./../../../helper/axios";

import "./Login.css";
const Index = () => {
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

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // set Verifying Loading
  const [verifing, setVerifing] = useState(false);
  const [verified, setVerified] = useState(false);

  // Otp For Verification
  const [inputOtp, setInputOtp] = useState("");
  const [changing, setChanging] = useState(false);
  const [changed, setChanged] = useState(false);

  console.log("Login" + optSending, tooManyTimeModal, changing);

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
    if (phone === "") {
      message.error("Type your Phone Number");
    } else if (password === "") {
      message.error("Type your Password");
    } else {
      // login
      dispatch(signInAction({ phone, password }));
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setOptSending(true);
    const { data: fetchIp } = await axios.get("https://jsonip.com/");
    if (fetchIp.ip) {
      const { data } = await axios.post("/sms/otp/reset", {
        phone,
        ip: fetchIp.ip,
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
      <div className="login_wrapper">
        <div className="glass">
          {/* responsie left part start*/}
          {/* responsive left part end */}
          <div className="left">
            <div style={{ textAlign: "center" }} id="icon">
              <h2>Broom Service</h2>
            </div>
            <div className="welcome">
              <p>Please sign in to your account and start the adventure.</p>
            </div>
          </div>
          <div className="right">
            <div className="responsive">
              <div className="res-icon">
                <span>bPanel</span>
              </div>
            </div>

            {!resetSection ? (
              <>
                <div className="login-section">
                  <div id="formContainer">
                    <form id="login-form">
                      <div className="rows">
                        <div className="column">
                          <label htmlFor="email">Phone</label>
                          <br />
                          <input
                            className="input"
                            type="text"
                            id="email"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="01XXXXXXXX"
                          />
                        </div>
                        <div className="column">
                          <label htmlFor="password">Password</label>
                          <br />
                          <input
                            className="input"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                LoginHandler();
                              }
                            }}
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="column">
                          <input
                            className="login-btn"
                            type="button"
                            disabled={loading}
                            defaultValue={
                              loading ? "Authenticating..." : "Log In"
                            }
                            onClick={LoginHandler}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="signin-section">
                  <p>
                    Forgot Password?{" "}
                    <a
                      onClick={() => setResetSection(true)}
                      className="anchor-link"
                    >
                      Reset now
                    </a>
                  </p>
                </div>
              </>
            ) : !sended ? (
              <>
                <div className="login-section">
                  <div id="formContainer">
                    <form id="login-form">
                      <div className="rows">
                        <div className="column">
                          <label htmlFor="email">Phone</label>
                          <br />
                          <input
                            className="input"
                            type="text"
                            id="email"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="01XXXXXXXX"
                          />
                        </div>

                        <div className="column">
                          <input
                            className="login-btn"
                            type="button"
                            defaultValue="Send otp"
                            onClick={sendOtp}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="signin-section">
                  <p>
                    <a
                      onClick={() => setResetSection(false)}
                      className="anchor-link"
                    >
                      Back to Login
                    </a>
                  </p>
                </div>
              </>
            ) : !verified ? (
              <>
                <div className="login-section">
                  <div id="formContainer">
                    <p>Enter Your 4-digit code we sent to</p>
                    <p> {phone}</p>
                    <form id="login-form">
                      <div className="rows">
                        <div className="column">
                          <label htmlFor="email">Phone</label>
                          <br />
                          <input
                            className="input"
                            type="text"
                            id="email"
                            value={inputOtp}
                            onChange={(e) => setInputOtp(e.target.value)}
                            placeholder="4-digit otp"
                          />
                        </div>

                        <div className="column">
                          <input
                            className="login-btn"
                            type="button"
                            defaultValue="Verify"
                            onClick={VerifiyOtp}
                          />
                        </div>

                        <div className="column">
                          {countdown === 0 ? (
                            <Button
                              onClick={() => {
                                // Some Reset to sent otp again
                                setCountdown(30);
                                setSended(false);
                              }}
                              // style={styles.mr10}
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
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="signin-section">
                  <p>
                    <a
                      onClick={() => setResetSection(false)}
                      className="anchor-link"
                    >
                      Back to Login
                    </a>
                  </p>
                </div>
              </>
            ) : !changed ? (
              <>
                <div className="login-section">
                  <div id="formContainer">
                    <form id="login-form">
                      <div className="rows">
                        <div className="column">
                          <label htmlFor="email">new Password</label>
                          <br />
                          <input
                            className="input"
                            type="text"
                            id="email"
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                            placeholder="new password"
                          />
                        </div>
                        <div className="column">
                          <label htmlFor="email">confirm new Password</label>
                          <br />
                          <input
                            className="input"
                            type="text"
                            id="email"
                            value={resetConfirmPassword}
                            onChange={(e) =>
                              setResetConfirmPassword(e.target.value)
                            }
                            placeholder="confirm new password"
                          />
                        </div>

                        <div className="column">
                          <input
                            className="login-btn"
                            type="button"
                            defaultValue="Reset"
                            onClick={changePassword}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
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
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="signin-section">
                  <p>
                    <a
                      onClick={() => setResetSection(false)}
                      className="anchor-link"
                    >
                      Back to Login
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
