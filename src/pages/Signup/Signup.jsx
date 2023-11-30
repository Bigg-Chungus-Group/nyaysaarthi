import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Button, Input, Checkbox } from "@nextui-org/react";
import "./Signup.css";

import login_image from "../../assets/signup_image.jpg";
import { toast } from "react-toastify";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  getAuth,
  linkWithPhoneNumber,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebaseConfig";

const Signup = () => {
  const navigate = useNavigate();
  const db = getFirestore(app);

  const [isbtnLoading, setIsbtnLoading] = React.useState(false);
  const [isbtnLoading2, setIsbtnLoading2] = React.useState(false);
  const [isbtnLoading3, setIsbtnLoading3] = React.useState(false);
  const [isbtnLoading4, setIsbtnLoading4] = React.useState(false);
  const [isbtnLoading5, setIsbtnLoading5] = React.useState(false);

  const [disabled, setDisabled] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cnfmPassword, setCnfmPassword] = React.useState("");
  const [isAgree, setIsAgree] = React.useState(false);

  const [step, setStep] = React.useState(1);

  const [phone, setPhone] = React.useState("");
  const [showOTPInput, setShowOTPInput] = React.useState(false);

  const [otp, setOTP] = React.useState("");

  // pass
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // cnfm pass
  const [isPassVisible, setPassIsVisible] = React.useState(false);
  const togglePassVisibility = () => setPassIsVisible(!isPassVisible);

  const auth = getAuth();

  useEffect(() => {
    if (step === 2) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      });
    }
  }, [step]);

  const steptwo = () => {
    if (email === "") {
      toast.error("Please enter your email");
      return;
    }

    if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be atleast 8 characters long");
      return;
    }

    if (password !== cnfmPassword) {
      toast.error("Password does not match");
      return;
    }

    if (!isAgree) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (
      email !== "" &&
      password.length >= 8 &&
      password === cnfmPassword &&
      isAgree
    ) {
      setIsbtnLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await setDoc(doc(db, "users", userCredential.user.uid), {
            profileSetup: false,
          });

          setIsbtnLoading(false);
          setStep(2);
        })
        .catch((error) => {
          toast.error("Something went wrong. Does this email already exist?");
          console.log(error);
          setIsbtnLoading(false);
        });
    }
  };

  const sendOTP = () => {
    if (phone === "") {
      toast.error("Please enter your phone number");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (phone !== "") {
      setIsbtnLoading2(true);

      linkWithPhoneNumber(
        auth.currentUser,
        "+91" + phone,
        window.recaptchaVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOTPInput(true);
          toast.success("OTP sent successfully");
          setDisabled(true);
        })
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            toast.error(
              "This phone number is already registered with another account"
            );
            return;
          }

          toast.error("Something went wrong. Please try again");
          console.log(error);
        })
        .finally(() => setIsbtnLoading2(false));
    }
  };

  const verifyOTP = () => {
    if (otp === "") {
      toast.error("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    if (otp !== "") {
      setIsbtnLoading3(true);

      setIsbtnLoading3(false);
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          toast.success("Account created successfully");
          setIsbtnLoading(false);
          navigate("/profile/setup");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-verification-code") {
            toast.error("Invalid OTP");
            return;
          }

          toast.error("Something went wrong. Please try again");
          console.log(error);
        })
        .finally(() => {
          setIsbtnLoading(false);
        });
    }
  };

  return (
    <>
      <div className="signup">
        {step === 1 ? (
          <div className="main-content">
            <div>
              <h3 style={{ fontWeight: "bold", fontSize: "35px" }}>Sign up</h3>
            </div>
            <div style={{ marginTop: "40px" }}>
              <Input
                variant="bordered"
                color="secondary"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
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
                    onClick={togglePassVisibility}
                  >
                    {isPassVisible ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                }
                type={isPassVisible ? "text" : "password"}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <Input
                style={{ width: "100%" }}
                color="secondary"
                label="Confirm Password"
                variant="bordered"
                value={cnfmPassword}
                onChange={(e) => setCnfmPassword(e.target.value)}
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
            <div style={{ marginTop: "20px" }}>
              <Checkbox
                color="secondary"
                style={{ fontWeight: "500" }}
                size="sm"
                onChange={(e) => setIsAgree(e.target.checked)}
              >
                I agree with{" "}
                <Link style={{ textDecoration: "underline" }} to="/">
                  Terms of Service
                </Link>
                , and{" "}
                <Link style={{ textDecoration: "underline" }} to="/">
                  Privacy Policy
                </Link>
              </Checkbox>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                style={{
                  backgroundColor: "#7928C9",
                  color: "white",
                  padding: "0px 60px",
                }}
                isLoading={isbtnLoading}
                onClick={steptwo}
              >
                Create Account
              </Button>
            </div>
            <div
              style={{
                marginTop: "60px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Already have an account?{" "}
              <Link style={{ textDecoration: "underline" }} to="/login">
                Sign In
              </Link>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="main-content">
            <h1 style={{ marginBottom: "20px" }}>Verify Your Phone Number</h1>
            <Input
              variant="bordered"
              color="secondary"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
            />
            <Button
              style={{
                backgroundColor: "#7928C9",
                color: "white",
                padding: "0px 60px",
                marginTop: "20px",
              }}
              id="sign-in-button"
              onClick={sendOTP}
              isLoading={isbtnLoading2}
              isDisabled={disabled}
            >
              Send OTP
            </Button>

            {showOTPInput ? (
              <div style={{ marginTop: "20px" }}>
                <h1 style={{ marginBottom: "20px" }}>Enter OTP</h1>
                <Input
                  variant="bordered"
                  color="secondary"
                  label="OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  type="number"
                />
                <Button
                  style={{
                    backgroundColor: "#7928C9",
                    color: "white",
                    padding: "0px 60px",
                    marginTop: "20px",
                    width: "100%",
                  }}
                  onClick={verifyOTP}
                  isLoading={isbtnLoading3}
                >
                  Verify
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="signup-image">
          <Image
            isZoomed
            className="image"
            src={login_image}
            alt="Cover Image"
            radius="none"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
