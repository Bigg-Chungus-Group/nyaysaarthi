import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Input, Select, SelectItem, Image, Button } from "@nextui-org/react";
import React, { useState, useRef } from "react";
import Logo from "../../../assets/navlogo.svg";
import Location from "./Location";
import { toast } from "react-toastify";

const License = ({personalInfo, acceptBack2}) => {
  const professions = [
    "Consultant",
    "Pro Bono",
    "Attorney",
    "Publisher",
    "Mediator / Arbitrator",
    "Public Defender",
    "Other",
  ];

  const [profession, setProfession] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [degree, setDegree] = useState(null);
  const [location, setLocation] = useState(false);

  const [license, setLicense] = useState({});

  const degreeCheckRef = useRef(null);
  const licenseCheckRef = useRef(null);
  const licenseRef = useRef(null);

  const degreeSet = (e) => {
    setDegree(e.target.files[0]);
    degreeCheckRef.current.style.display = "block";
  };

  const licenseSet = (e) => {
    setLicenseNumber(e.target.files[0]);
    licenseCheckRef.current.style.display = "block";
  };

  const goToLocation = () => {
    if (profession === null || licenseNumber === null || degree === null || licenseNumber === null) {
      toast.error("Please fill all the fields");
      return;
    }

    setLicense({
      profession,
      licenseNumber,
      degree,
      licenseNumber,
    });

    licenseRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      licenseRef.current.style.display = "none";
      setLocation(true);
    }, 1000);
  };

  const goback = () => {
    licenseRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      licenseRef.current.style.display = "none";
      acceptBack2();
    }, 1000);
  };

  const acceptBack3 = () => { 
    setLocation(false);
    licenseRef.current.style.display = "block";
    licenseRef.current.classList.remove("animate__fadeOutUp");
    licenseRef.current.classList.add("animate__fadeInUp");
  }

  return (
    <>
      <Box
        className="animate__animated animate__fadeInUp license"
        ref={licenseRef}
      >
        <Image src={Logo} width="100px" height="100px" />
        <Text>Choose Your Specialization: </Text>
        <Flex gap="20px" align="center" justify="center" width="100%">
          <Box width="100%">
            <Select
              placeholder="Select Profession"
              style={{ marginTop: "20px", marginBottom: "10px" }}
              onChange={(e) => setProfession(e.target.value)}
              aria-label="profession"
            >
              {professions.map((profession) => (
                <SelectItem key={profession} value={profession}>
                  {profession}
                </SelectItem>
              ))}
            </Select>
          </Box>
          <Input
            type="text"
            placeholder="License Number"
            aria-label="License Number"
          />
        </Flex>

        <Text mt="10px">Upload</Text>
        <Flex gap="20px" align="center" justify="center">
          <label htmlFor="degree">
            Proof of Degree{" "}
            <i
              style={{
                marginLeft: "10px",
                color: "green",
                transition: ".2s",
                display: "none",
              }}
              ref={degreeCheckRef}
              className="fa-solid fa-circle-check"
            ></i>
          </label>
          <input type="file" id="degree" hidden onChange={degreeSet} aria-label="degree"/>

          <label htmlFor="license">
            Proof of License{" "}
            <i
              style={{
                marginLeft: "10px",
                color: "green",
                transition: ".2s",
                display: "none",
              }}
              className="fa-solid fa-circle-check"
              ref={licenseCheckRef}
            ></i>
          </label>
          <input
            type="file"
            id="license"
            hidden
            onChange={licenseSet}
            aria-label="license"
          />
        </Flex>
        <Center mt="20px" gap="10px">
          <Button color="danger" onClick={goback}>Back</Button>
          <Button color="primary" onClick={goToLocation}>
            Next
          </Button>
        </Center>
      </Box>
      {location ? <Location personalInfo={personalInfo} license={license} acceptBack3={acceptBack3} /> : null}
    </>
  );
};

export default License;
