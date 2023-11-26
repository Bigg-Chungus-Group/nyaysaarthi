import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { Skeleton } from "@nextui-org/react";

const User = () => {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <>
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
                  <Skeleton cursor="pointer">
                    <i
                      className="fa-solid fa-graduation-cap"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Services
                  </Skeleton>
                  <Skeleton cursor="pointer">
                    <i
                      className="fa-solid fa-shapes"
                      style={{ marginRight: "10px" }}
                    ></i>{" "}
                    Categories
                  </Skeleton>
                  <Skeleton cursor="pointer">
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Price
                  </Skeleton>
                  <Skeleton cursor="pointer">
                    <i
                      className="fa-solid fa-star"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Customer Reviews
                  </Skeleton>
                  <Skeleton cursor="pointer">
                    <i
                      className="fa-solid fa-sliders"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Sort By
                  </Skeleton>
                </Flex>
              </Box>
              <Skeleton
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
              </Skeleton>
            </Flex>
            <Flex
              direction="column"
              gap="20px"
              width="50%"
              borderRadius="10px"
              p="20px"
            >
              <Skeleton>
                <ServiceCard />
              </Skeleton>
            </Flex>
            <Flex direction="column" width="20%" borderRadius="10px" p="20px">
              <Skeleton bg="#FEFEFF" borderRadius="10px">
                <Flex
                  align="center"
                  justify="center"
                  bg="#7929C8"
                  color="white"
                  borderTopRadius="20px"
                  p="20px"
                >
                  <i
                    className="fa-solid fa-file-lines"
                    style={{ marginRight: "10px" }}
                  ></i>
                  My Service Requests
                </Flex>
                <Box height="150px" overflowY="auto" p="20px">
                  <Text textAlign="center">
                    You Have Not Made Any Service Requests Yet
                  </Text>
                </Box>
              </Skeleton>
            </Flex>
          </Flex>
        </Box>
        );
      </>
    );
  } else {
    return (
      <>
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
                  <Box cursor="pointer">
                    <i
                      className="fa-solid fa-graduation-cap"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Services
                  </Box>
                  <Box cursor="pointer">
                    <i
                      className="fa-solid fa-shapes"
                      style={{ marginRight: "10px" }}
                    ></i>{" "}
                    Categories
                  </Box>
                  <Box cursor="pointer">
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Price
                  </Box>
                  <Box cursor="pointer">
                    <i
                      className="fa-solid fa-star"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Customer Reviews
                  </Box>
                  <Box cursor="pointer">
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
            <Flex
              direction="column"
              gap="20px"
              width="50%"
              borderRadius="10px"
              p="20px"
            >
              <ServiceCard />
            </Flex>
            <Flex direction="column" width="20%" borderRadius="10px" p="20px">
              <Box bg="#FEFEFF" borderRadius="10px">
                <Flex
                  align="center"
                  justify="center"
                  bg="#7929C8"
                  color="white"
                  borderTopRadius="20px"
                  p="20px"
                >
                  <i
                    className="fa-solid fa-file-lines"
                    style={{ marginRight: "10px" }}
                  ></i>
                  My Service Requests
                </Flex>
                <Box height="150px" overflowY="auto" p="20px">
                  <Text textAlign="center">
                    You Have Not Made Any Service Requests Yet
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Box>
        );
      </>
    );
  }
};

export default User;
