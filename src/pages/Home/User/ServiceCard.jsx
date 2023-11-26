import React from "react";
import { Box, Flex, Avatar, Text, Heading, Badge } from "@chakra-ui/react";
// import React from 'react'
import "../../Services/Services.css"
import {Button,Divider} from "@nextui-org/react";
import "./ServiceCard.css";

const ServiceCard = () => {
  const data = [
    {
      fname: "Aarvav",
      lname: "Patel",
      serviceName: "Notary",
      status: "available",
      desc: "I am a Notary",
      rating: 4.5,
      noOfReviews: 10,
      minPrice: 1000,
    },

    {
      fname: "Ishita",
      lname: "Sharma",
      serviceName: "Arbitrator",
      status: "unavailable",
      desc: "I am a Arbitrator",
      rating: 4.9,
      noOfReviews: 64,
      minPrice: 5000,
    },
  ];

  return (
    <>
      {/*}
      {data.map((item) => {
        return (
          <Box bg="#FEFEFF" p="20px">
            <Text>
              {item.fname} {item.lname}
            </Text>
            <Heading>{item.serviceName}</Heading>
            <Flex>
                <Badge colorScheme={item.status === "available" ? "green" : "red"} mt="20px">{item.status}</Badge>
            </Flex>
          </Box>
        );
      })}
    {*/}

      <div className="service2">
        <div className="cards">
          <div className="card1">
            <div className="name">Aarav Patel</div>
            <div className="service-name">Service Name</div>
            <div className="status">
              <div className="availablility">Available</div>
              <div className="rating-review">
                <div>
                  <span>4.7</span> (1k Review)
                </div>
              </div>
            </div>

            <Divider style={{ marginTop: "20px" }} />

            <p>
              <span>service description: </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="request">
              minimum service price{" "}
              <Button color="secondary">request service</Button>
            </div>
          </div>
          <div className="card1">
            <div className="name">Aarav Patel</div>
            <div className="service-name">Service Name</div>
            <div className="status">
              <div className="availablility">Available</div>
              <div className="rating-review">
                <div>
                  <span>4.7</span> (1k Review)
                </div>
              </div>
            </div>

            <Divider style={{ marginTop: "20px" }} />

            <p>
              <span>service description: </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="request">
              minimum service price{" "}
              <Button color="secondary">request service</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
