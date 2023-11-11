import React, { useEffect } from "react";
import "./Login.css";
import { Image, Button, Input, Link } from "@nextui-org/react";

import login_image from "../../assets/login_image.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnLoading2, setBtnLoading2] = React.useState(false);
  const [btnLoading3, setBtnLoading3] = React.useState(false);

  const [type, setType] = React.useState("email");
  const [showOTP, setShowOTP] = React.useState(false);
  const [otp, setOTP] = React.useState("");

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const auth = getAuth();

  useEffect(() => {
    if (type === "phone") {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "send-otp", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      });
    }
  }, [type]);

  const handleLogin = () => {
    if (username === "" || password === "") {
      toast.error("Please enter all the fields");
      return;
    }

    if (type === "email") {
      setBtnLoading(true);
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          navigate("/");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            toast.error("User not found");
            return;
          }

          if (error.code === "auth/invalid-login-credentials") {
            toast.error("Wrong Email or Password");
            return;
          }

          if (error.code === "auth/too-many-requests") {
            toast.error("Too many requests. Please try again later");
            return;
          }

          toast.error("Something went wrong");
          console.log(error);
        })
        .finally(() => setBtnLoading(false));
    }
  };

  const sendOTP = () => {
    if (username === "") {
      toast.error("Please enter all the fields");
      return;
    }

    if (type === "phone") {
      setBtnLoading2(true);
      const phoneNumber = `+91${username}`;
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOTP(true);
          setBtnLoading2(false);
          toast.success("OTP Sent");
        })
        .catch((error) => {
          if (error.code === "auth/too-many-requests") {
            toast.error("Too many requests. Please try again later");
            return;
          }

          toast.error("Something went wrong");
          console.log(error);
          setBtnLoading2(false);
        });
    }
  };

  const verifyOTP = () => {
    if (username === "" || otp === "") {
      toast.error("Please enter all the fields");
      return;
    }

    if (type === "phone") {
      setBtnLoading3(true);
      const code = otp;
      confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          navigate("/");
        })
        .catch((error) => {
          toast.error("Wrong OTP");
          console.log(error);
          setBtnLoading3(false);
        });
    }
  };

  return (
    <div className="login">
      <div className="main-content">
        <div>
          <h3 style={{ fontWeight: "bold", fontSize: "35px" }}>
            Welcome Back!
          </h3>
        </div>
        <div
          style={{
            marginTop: "5px",
            fontWeight: "600",
            color: "grey",
            fontSize: "20px",
          }}
        >
          Please enter your details
        </div>
        {type === "email" ? (
          <>
            <div style={{ marginTop: "40px" }}>
              <Input
                variant="bordered"
                color="secondary"
                type="email"
                label="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <Input
                style={{ width: "100%" }}
                color="secondary"
                label="Password"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                color="foreground"
                onClick={() => setType("phone")}
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "grey",
                  cursor: "pointer",
                }}
                to="/"
              >
                Sign in with Phone Number Instead
              </Link>
              <Link
                color="foreground"
                onClick={() => navigate("/forgot")}
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "grey",
                  cursor: "pointer",
                }}
                to="/"
              >
                Forgot Password?
              </Link>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                style={{
                  backgroundColor: "#7928C9",
                  color: "white",
                  padding: "0px 100px",
                }}
                isLoading={btnLoading}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </div>
          </>
        ) : (
          <>
            {showOTP ? (
              <>
                <div style={{ marginTop: "20px" }}>
                  <p style={{ marginBottom: "10px" }}>Enter The OTP We Sent</p>
                  <Input
                    variant="bordered"
                    color="secondary"
                    type="number"
                    label="OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Button
                    style={{
                      backgroundColor: "#7928C9",
                      color: "white",
                      padding: "0px 100px",
                    }}
                    isLoading={btnLoading3}
                    onClick={verifyOTP}
                  >
                    Sign in
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: "40px" }}>
                  <Input
                    variant="bordered"
                    color="secondary"
                    type="number"
                    label="Mobile Number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <Button
                  style={{ marginTop: "20px" }}
                  color="secondary"
                  onClick={sendOTP}
                  isLoading={btnLoading2}
                  id="send-otp"
                >
                  Send OTP
                </Button>
              </>
            )}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                color="foreground"
                onClick={() => setType("email")}
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "grey",
                  cursor: "pointer",
                }}
                to="/"
              >
                Sign in with Email Instead
              </Link>
              <Link
                color="foreground"
                onClick={() => navigate("/forgot")}
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "grey",
                  cursor: "pointer",
                }}
                to="/"
              >
                Forgot Password?
              </Link>
            </div>
          </>
        )}

        <div
          style={{ marginTop: "60px", textAlign: "center", fontWeight: "600" }}
        >
          Don&apos;t have an account?{" "}
          <Link style={{ textDecoration: "underline" }} to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="main-image">
        <Image
          isZoomed
          className="image"
          src={login_image}
          alt="NextUI Album Cover"
          radius="none"
        />
      </div>
    </div>
  );
};

export default Login;
