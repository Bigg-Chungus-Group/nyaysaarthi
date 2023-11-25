import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ServiceCard from "./ServiceCard";

const User = () => {
  return (
    <Box bg="#F8F3FF">
      <Flex justifyContent="center" gap="20px" p="20px 0" height="90vh">
        <Flex direction="column" gap="20px" width="20%" p="20px">
          <Box>
            <Flex
              bg="#FEFEFF"
              p="20px"
              gap="20px"
              direction="column"
              borderRadius="10px"
            >
              <Box>
                <i
                  className="fa-solid fa-graduation-cap"
                  style={{ marginRight: "10px" }}
                ></i>
                Services
              </Box>
              <Box>
                <i
                  className="fa-solid fa-shapes"
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                Categories
              </Box>
              <Box>
                <i
                  className="fa-solid fa-location-dot"
                  style={{ marginRight: "10px" }}
                ></i>
                Price
              </Box>
              <Box>
                <i
                  className="fa-solid fa-star"
                  style={{ marginRight: "10px" }}
                ></i>
                Customer Reviews
              </Box>
              <Box>
                <i
                  className="fa-solid fa-sliders"
                  style={{ marginRight: "10px" }}
                ></i>
                Sort By
              </Box>
            </Flex>
          </Box>
          <Flex
            align="center"
            justify="center"
            color="#7929C8"
            borderRadius="20px"
            border="1px solid #7929C8"
            p="10px"
          >
            <i
              className="fa-solid fa-file-circle-plus"
              style={{ marginRight: "10px" }}
            ></i>{" "}
            Post a Service Request
          </Flex>
        </Flex>
        <Flex direction="column" gap="20px" width="50%" borderRadius="10px" p="20px">
          <ServiceCard />
        </Flex>
        <Flex
          direction="column"
          width="20%"
          borderRadius="10px"
          p="20px"
        >
          <Box bg="#FEFEFF" borderRadius="10px">
            <Flex align="center" justify="center" bg="#7929C8" color="white" borderTopRadius="20px" p="20px">
              <i
                class="fa-solid fa-file-lines"
                style={{ marginRight: "10px" }}
              ></i>
              My Service Requests
            </Flex>
            <Box height="150px" overflowY="auto" p="20px">
                <Text textAlign="center">You Have Not Made Any Service Requests Yet</Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default User;
