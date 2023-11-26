import React, { useRef, useState } from "react";
import "animate.css";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  user,
} from "@nextui-org/react";
import Logo from "../../../assets/navlogo.svg";
import { toast } from "react-toastify";
import Location from "./Location";
const Client = ({ acceptBack }) => {
  const clientRef = useRef(null);
  const [location, setLocation] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [personalInfo, setPersonalInfo] = useState({});

  const goToLocation = () => {
    if (firstname === "" || lastname === "" || dob === "" || gender === "") {
      toast.error("Please fill all the fields");
      return;
    }

    setPersonalInfo({
      firstname,
      lastname,
      dob,
      gender,
    });

    clientRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      clientRef.current.style.display = "none";
      setLocation(true);
    }, 700);
  };

  const goBack = () => {
    clientRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      clientRef.current.style.display = "none";
      acceptBack();
    }, 700);
  };

  const acceptBack3 = () => {
    setLocation(false);
    clientRef.current.style.display = "block";
    clientRef.current.classList.remove("animate__fadeOutUp");
    clientRef.current.classList.add("animate__fadeInUp");

  };

  return (
    <>
      <Box
        className="animate__animated animate__fadeInUp provider"
        ref={clientRef}
      >
        <Image src={Logo} width="100px" height="100px" />
        <Text color="gray">We are glad to have you onboard!</Text>

        <Box className="client__form">
          <Flex gap="20px" mt="40px">
            <Box>
              <label mb="10px" htmlFor="firstname">
                First Name
              </label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Box>

            <Box>
              <label htmlFor="lastname" mb="10px">
                Last Name
              </label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Box>
          </Flex>

          <Flex gap="20px" mt="20px">
            <Box>
              <label htmlFor="dob" mb="10px">
                Date of Birth
              </label>
              <Input
                type="date"
                name="dob"
                id="dob"
                placeholder="DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Box>

            <Box width="100%">
              <label htmlFor="gender" mb="10px">
                Gender
              </label>
              <Select
                placeholder="Gender"
                id="gender"
                aria-label="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <SelectItem key="male" value="male">
                  Male
                </SelectItem>
                <SelectItem key="female" value="female">
                  Female
                </SelectItem>
                <SelectItem key="others" value="others">
                  Others
                </SelectItem>
              </Select>
            </Box>
          </Flex>
          <Center mt="20px" gap="10px">
            <Button color="danger" onClick={goBack}>
              Back
            </Button>
            <Button color="primary" onClick={goToLocation}>
              Next
            </Button>
          </Center>
        </Box>
      </Box>

      {location ? <Location personalInfo={personalInfo} acceptBack3={acceptBack3} /> : null}
    </>
  );
};

export default Client;

