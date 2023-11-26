import React, { useEffect } from "react";
import "animate.css";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import {
  Input,
  Button,
  Image,
  Autocomplete,
  AutocompleteItem,
  Skeleton,
} from "@nextui-org/react";
import ProfilePicture from "./ProfilePicture";
import { toast } from "react-toastify";

const Location = ({ personalInfo, license, acceptBack3 }) => {
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [dropdown, setDropdown] = React.useState([]);
  const [pinMap, setPinMap] = React.useState("");
  const [selected, setSelected] = React.useState(false);
  const [latlon, setLatlon] = React.useState([]);
  const [properties, setProperties] = React.useState([]);
  const [mapSrc, setMapSrc] = React.useState(<Skeleton />);
  const [profilePicture, setProfilePicture] = React.useState(false);

  const [locationInfo, setLocationInfo] = React.useState({});

  const locationRef = React.useRef(null);

  useEffect(() => {
    if (!selected) {
      var requestOptions = {
        method: "GET",
      };

      if (address !== "" && address !== null) {
        fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=2aab1921aaa744d286e309b0a0c4a6fe`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            const arr = [];
            let latlong = [];
            let properties = [];
            result?.features?.forEach((item) => {
              arr.push(item.properties.formatted);
              latlong.push(item.properties.lon + "," + item.properties.lat);
              properties.push(item.properties);
            });
            setDropdown(arr);
            setLatlon(latlong);
            setProperties(properties);
            setCity(properties[0]?.city);
            setState(properties[0]?.state);
          })
          .catch((error) => console.log("error", error));
      }
    }
  }, [address]);

  useEffect(() => {
    if (latlon.length > 0) {
      const image = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=1080&height=400&center=lonlat:${latlon[pinMap]}&zoom=14&apiKey=2aab1921aaa744d286e309b0a0c4a6fe`;
      setMapSrc(image);
    }
  }, [pinMap]);

  const cooldown = (e) => {
    setSelected(true);
    setPinMap(e);
    setTimeout(() => {
      setSelected(false);
    }, 1000);
  };

  const goToPfp = () => {
    if (
      locality === "" ||
      pincode === "" ||
      pinMap === "" ||
      address === "" ||
      city === "" ||
      state === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    setLocationInfo({
      locality,
      pincode,
      pinMap,
      address,
      city,
      state,
      latlon,
    });

    locationRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      locationRef.current.style.display = "none";
      setProfilePicture(true);
    }, 1000);
  };

  const goBack = () => {
    locationRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      locationRef.current.style.display = "none";
      acceptBack3();
    }, 1000);
  };

  const acceptBack4 = () => {
    setProfilePicture(false);
    locationRef.current.style.display = "block";
    locationRef.current.classList.remove("animate__fadeOutUp");
    locationRef.current.classList.add("animate__fadeInUp");
  };

  return (
    <>
      <Box
        className="animate__animated animate__fadeInUp location"
        ref={locationRef}
      >
        <Text mb="20px">Location</Text>

        <div className="right_profile">
          <Autocomplete
            onInputChange={setAddress}
            label="Address"
            onSelectionChange={cooldown}
          >
            {dropdown.map((item, index) => (
              <AutocompleteItem key={index}>{item}</AutocompleteItem>
            ))}
          </Autocomplete>

          <Box mt="20px" width="500px" height="188px" id="map">
            <Image src={mapSrc} height="200px" width="500px" />
          </Box>

          <Flex gap="20px" align="center" justify="center" mt="30px">
            <div>
              <Input
                key="outside"
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder=""
                isDisabled={true}
                value={properties[pinMap]?.city || ""}
              />
            </div>
            <div>
              <Input
                key="outside"
                type="text"
                label="State"
                labelPlacement="outside"
                placeholder=""
                isDisabled={true}
                value={properties[pinMap]?.state || ""}
              />
            </div>
          </Flex>

          <Flex gap="20px" align="center" justify="center" mt="20px">
            <div>
              <Input
                key="outside"
                type="text"
                label="Locality"
                labelPlacement="outside"
                placeholder="Locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
              />
            </div>
            <div>
              <Input
                key="outside"
                type="number"
                label="Pin Code"
                labelPlacement="outside"
                placeholder="Pin Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
          </Flex>
          <Center mt="20px" gap="10px">
            <Button color="danger" onClick={goBack}>
              Back
            </Button>
            <Button color="primary" onClick={goToPfp}>
              Next
            </Button>
          </Center>
        </div>
      </Box>
      {profilePicture ? (
        <ProfilePicture
          personalInfo={personalInfo}
          license={license}
          locationInfo={locationInfo}
          acceptBack4={acceptBack4}
        />
      ) : null}
    </>
  );
};

export default Location;
