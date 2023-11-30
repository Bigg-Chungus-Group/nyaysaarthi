import React, { useEffect, useState } from "react";
import "./SetupProfile.css";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import Provider from "./Provider/Provider";
import Client from "./Client/Client";

const SetupProfile = () => {
  const [role, setRole] = useState(null);
  const selectRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  const [provider, setProvider] = useState(false);
  const [client, setClient] = useState(false);

  useEffect(() => {
    if (role === "C" || role === "S") {
      selectRef.current.classList.add("animate__animated");
      selectRef.current.classList.add("animate__fadeOutUp");
      console.log(role)

      setTimeout(() => {
        selectRef.current.style.display = "none";
        setProvider(role === "S" ? true : false);
        setClient(role === "C" ? true : false);
      }, 500);
    }
  }, [role]);

  const acceptBack = () => {
    selectRef.current.classList.remove("animate__fadeOutUp");
    selectRef.current.classList.add("animate__fadeInUp");
    selectRef.current.style.display = "block";
    bodyRef.current.style.overflow = "auto";
    setRole(null);
    setProvider(false);
    setClient(false);
  };

  return (
    <>
      <Box className="setupProfile" ref={bodyRef}>
        <Box className="select" ref={selectRef}>
          <Text fontSize="30px" fontWeight="500" className="hideOnSelect">
            Setup Profile
          </Text>
          <Text fontSize="15px" mt="10px" className="hideOnSelect">
            I am a
          </Text>
          <Flex mt="20px">
            {" "}
            <Box
              className="select__options"
              borderLeftRadius="20px"
              onClick={() => setRole("S")}
              id="lawyer"
            >
              <i className="fa-solid fa-gavel"></i>
              <Text>Service Provider</Text>
            </Box>
            <Box
              className="select__options"
              borderRightRadius="20px"
              onClick={() => setRole("C")}
              id="client"
            >
              <i className="fa-solid fa-user"></i>
              <Text>Client</Text>
            </Box>
          </Flex>
        </Box>
        {provider ? <Provider acceptBack={acceptBack} /> : null}
        {client ? <Client acceptBack={acceptBack} /> : null}
      </Box>
    </>
  );
};

export default SetupProfile;
