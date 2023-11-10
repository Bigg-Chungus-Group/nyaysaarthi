import React from "react";
import { Link } from "react-router-dom";
import { Image, Button, Input, Checkbox } from "@nextui-org/react";
import "./Signup.css";

import login_image from "../../assets/signup_image.jpg";

const Signup = () => {

    // pass
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    // cnfm pass
    const [isPassVisible, setPassIsVisible] = React.useState(false);
    const togglePassVisibility = () => setPassIsVisible(!isPassVisible);

    return (
        <div className="signup">
            <div className="main-content">
                <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '35px' }}>Sign up</h3>
                </div>
                <div style={{ marginTop: '40px' }}>
                    <Input variant="bordered" color='secondary' type="email" label="Email or Mobile Number" placeholder="Enter your email or mobile number" />
                </div>
                <div style={{ marginTop: '20px', display: 'flex' }}>
                    <Input
                        style={{width:'100%'}}
                        color='secondary'
                        label="Password"
                        variant="bordered"
                        placeholder="6+ characters"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={togglePassVisibility}>
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
                <div style={{ marginTop: '20px' }}>
                    <Input
                        style={{width:'100%'}}
                        color='secondary'
                        label="Confirm Password"
                        variant="bordered"
                        placeholder="6+ characters"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
                <div style={{ marginTop: '20px' }}>
                    <Checkbox color='secondary' style={{ fontWeight: '500' }} size="sm" defaultSelected>I agree with <Link style={{ textDecoration: 'underline' }} to='/'>Terms of Service</Link>, and <Link style={{ textDecoration: 'underline' }} to='/'>Privacy Policy</Link></Checkbox>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button style={{ backgroundColor: '#7928C9', color: 'white', padding: '0px 60px' }}>Create Account</Button>
                </div>
                <div style={{ marginTop: '60px', textAlign: 'center', fontWeight: '600' }}>
                    Already have an account? <Link style={{ textDecoration: 'underline' }} to="/login">Sign In</Link>
                </div>
            </div>
            <div className="signup-image">
                <Image
                    isZoomed
                    className="image"
                    src={login_image}
                    alt="NextUI Album Cover"
                    radius="none"
                />
            </div>
        </div>
    )
}

export default Signup