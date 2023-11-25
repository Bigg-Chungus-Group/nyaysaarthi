// import React from 'react'
import "./Services.css"
import {Button} from "@nextui-org/react";
const Services = () => {
    return (
        <>
            <div className="service">
                <div className="service1">
                    <div className="service-list">
                        <div>Services</div>
                        <div>Categiries</div>
                        <div>Location</div>
                        <div>Price</div>
                        <div>Customer Review</div>
                        <div>Sort by</div>
                        <div>Service Guidance</div>
                    </div>

                    <div className="service-request">
                        Post a Service Request
                    </div>

                </div>

                <div className="service2"></div>

                <div className="service3">
                    <div className="my-service-request">
                        <div className="request-heading">My Service Requests</div>
                        <div className="request-list">You have not made any request</div>
                    </div>
                    <div className="service-requestor">
                        <div className="service-requestor-heading">Service Requestor</div>
                        <p className="description"><span>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </span></p>
                        <Button className="btn" color="secondary">Start Assessment</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services