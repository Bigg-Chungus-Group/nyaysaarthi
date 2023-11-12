import React, { useEffect } from "react";
import "./Profile_setup.css";
import {
  Divider,
  Avatar,
  Input,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Autocomplete,
  Image,
  AutocompleteItem,
  Skeleton,
} from "@nextui-org/react";

const Profile = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [address, setAddress] = React.useState("");
  const [dropdown, setDropdown] = React.useState([]);
  const [pinMap, setPinMap] = React.useState("");
  const [selected, setSelected] = React.useState(false);
  const [latlon, setLatlon] = React.useState([]);
  const [properties, setProperties] = React.useState([]);
  const [mapSrc, setMapSrc] = React.useState(<Skeleton />);

  useEffect(() => {
    if (!selected) {
      var requestOptions = {
        method: "GET",
      };

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
        })
        .catch((error) => console.log("error", error));
    }
  }, [address]);

  useEffect(() => {
    console.log("PIN");
    console.log(latlon[pinMap]);

    const mapdiv = document.getElementById("map");
    const image = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=1080&height=400&center=lonlat:${latlon[pinMap]}&zoom=14&apiKey=2aab1921aaa744d286e309b0a0c4a6fe`;
    setMapSrc(image);
  }, [pinMap]);

  const cooldown = (e) => {
    setSelected(true);
    setPinMap(e);
    setTimeout(() => {
      setSelected(false);
    }, 1000);
  };

  return (
    <div className="profile_set_up">
      {/* Tracker */}
      <div className="tracker">
        <Checkbox
          size="lg"
          color="secondary"
          isReadOnly
          defaultSelected
          radius="full"
        >
          Sign Up
        </Checkbox>
        <Divider className="tracker_divider" />
        <Checkbox size="lg" color="secondary" isReadOnly radius="full">
          Save Details
        </Checkbox>
        <Divider className="tracker_divider" />
        <Checkbox size="lg" color="secondary" isReadOnly radius="full">
          Explore
        </Checkbox>
      </div>
      <div className="profile">
        {/* Profile left side */}
        <div className="left_profile">
          <div className="avatar">
            <Avatar
              className="aavatar"
              isBordered
              size="lg"
              color="secondary"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </div>
          <div className="lr2">
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                isDisabled={true}
              />
            </div>
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="phone"
                label="Phone"
                labelPlacement="outside"
                placeholder="Enter your Phone number"
                isDisabled={true}
              />
            </div>
          </div>
          <div className="lr1">
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="text"
                label="First Name"
                labelPlacement="outside"
                placeholder="Enter your first name"
              />
            </div>
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="text"
                label="Last Name"
                labelPlacement="outside"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="rr1">
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="date"
                label="Date of Birth"
                labelPlacement="outside"
                placeholder="wd"
              />
            </div>

            <div style={{ width: "45%" }}>
              <Select
                labelPlacement="outside"
                label="Gender"
                placeholder="Select gender"
                className="max-w-xs"
              >
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="male">Female</SelectItem>
              </Select>
            </div>
          </div>
        </div>

        {/* Middle Line */}
        <Divider className="divider" orientation="vertical" />
        {/* Profile right side  */}
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

          <div id="map" style={{ height: "120px" }}>
            <Image src={mapSrc} />
          </div>

          <div className="rr2">
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder=""
                isDisabled={true}
                value={properties[pinMap]?.city}
              />
            </div>
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="text"
                label="State"
                labelPlacement="outside"
                placeholder=""
                isDisabled={true}
                value={properties[pinMap]?.state}
              />
            </div>
          </div>
          <div className="rr2">
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder="Locality"
              />
            </div>
            <div style={{ width: "45%" }}>
              <Input
                key="outside"
                type="number"
                label="State"
                labelPlacement="outside"
                placeholder="Pin Code"
              />
            </div>
          </div>
          <Button color="secondary" style={{marginTop: "40px", float: "right"}}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
