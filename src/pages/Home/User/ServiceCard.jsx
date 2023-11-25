import React from "react";
import { Box, Flex, Avatar, Text, Heading, Badge } from "@chakra-ui/react";

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
    </>
  );
};

export default ServiceCard;
