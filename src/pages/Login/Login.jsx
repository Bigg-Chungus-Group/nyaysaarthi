import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Image,Button,Input,Checkbox } from "@nextui-org/react";

import login_image from "../../assets/login_image.jpg";

const Login = () => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="login">
            <div className="main-content">
                <div>
                    <h3 style={{fontWeight:'bold',fontSize:'35px'}}>Welcome Back!</h3>
                </div>
                <div style={{marginTop:'5px',fontWeight:'600',color:'grey',fontSize:'20px'}}>
                    Please enter your details
                </div>
                <div style={{marginTop:'40px'}}>
                <Input variant="bordered" color='secondary' type="email" label="Email or Mobile Number" placeholder="Enter your email or mobile number" />
                </div>
                <div style={{marginTop:'20px'}}>
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
                <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
                <Checkbox color='secondary' style={{fontWeight:'600'}} size="sm" defaultSelected>Remember me</Checkbox><Link style={{fontSize:'12px',fontWeight:'500',color:'grey'}} to='/'>Forgot Password?</Link>
                </div>
                <div style={{marginTop:'20px',textAlign:'center'}}>
                    <Button style={{backgroundColor:'#7928C9',color:'white',padding:'0px 100px'}}>Sign in</Button>
                </div>
                <div style={{marginTop:'60px',textAlign:'center',fontWeight:'600'}}>
                    Don&apos;t have an account? <Link style={{textDecoration:'underline'}} to="/signup">Sign Up</Link>
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
    )
}

export default Login