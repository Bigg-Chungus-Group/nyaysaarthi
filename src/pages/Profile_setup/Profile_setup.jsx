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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Slider,
} from "@nextui-org/react";
// import AvatarEditor from "react-avatar-editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebaseConfig";
import { updateDoc, getFirestore, getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

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
  const [zoom, setZoom] = React.useState(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [pincode, setPincode] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [image, setImage] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState("");

  const [loading, setLoading] = React.useState(true);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [newImage, setNewImage] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().profileSetup !== false) {
          navigate("/");
          return;
        }

        setLoading(false);
        setEmail(user.email);
        setPhone(user.phoneNumber);
      } else {
        navigate("/login");
      }
    });
  }, []);

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
          setCity(properties[0]?.city);
          setState(properties[0]?.state);
        })
        .catch((error) => console.log("error", error));
    }
  }, [address]);

  useEffect(() => {
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

  const openImageEditor = (e) => {
    setImage(e.target.files[0]);
    onOpen();
  };

  const editorRef = React.useRef(null);

  const setNewSrc = () => {
    const image = editorRef.current.getImageScaledToCanvas().toDataURL();
    console.log(image);

    setImageSrc(image);
    onOpenChange();
  };

  const fb = getFirestore();
  const auth = getAuth();
  const storage = getStorage(app);

  const saveProfile = () => {
    if (
      email === "" ||
      phone === "" ||
      fname === "" ||
      lname === "" ||
      dob === "" ||
      gender === "" ||
      city === "" ||
      state === "" ||
      locality === "" ||
      pincode === "" ||
      address === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (dob > new Date().toISOString().split("T")[0]) {
      toast.error("Please enter a valid date of birth");
      return;
    }

    if (dob < "1900-01-01") {
      toast.error("Please enter a valid date of birth");
      return;
    }

    setBtnLoading(true);
    const profilePictureRef = ref(
      storage,
      "profilePictures/" + auth.currentUser.uid + ".png"
    );

    // More than 18
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 18) {
      toast.error("You must be 18 years or older to use this app");
      return;
    }
    
    if (image !== "") {
      console.log("ADDING TO STORAGE");
      uploadString(profilePictureRef, imageSrc, "data_url")
        .then((snapshot) => {})
        .catch((error) => {
          console.log(error);
          setBtnLoading(false);
          toast.error("Error in uploading profile picture");
          return;
        });
    }

    const docRef = doc(fb, "users", auth.currentUser.uid);
    updateDoc(docRef, {
      email: email.toString(),
      phone: phone.toString(),
      fname: fname.toString(),
      lname: lname.toString(),
      dob: dob.toString(),
      gender: gender.toString(),
      city: city.toString(),
      state: state.toString(),
      locality: locality.toString(),
      pincode: pincode.toString(),
      address: address.toString(),
      profileSetup: true,
    })
      .then(() => {
        setBtnLoading(false);
        toast.success("Profile saved successfully");
        navigate("/");
      })
      .catch((error) => {
        setBtnLoading(false);
        toast.error("Error in saving profile");
        return;
      });
  };

  if (loading) return <Loader />;
  else {
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
                color="secondary"
                src={imageSrc}
              />
              <label className="avatar_overlay" htmlFor="file">
                <i className="fa-solid fa-pen"></i>
              </label>
              <input
                name="file"
                id="file"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={openImageEditor}
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
                  value={email}
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
                  value={phone}
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
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div style={{ width: "45%" }}>
                <Input
                  key="outside"
                  type="text"
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Enter your last name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
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
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div style={{ width: "45%" }}>
                <Select
                  labelPlacement="outside"
                  label="Gender"
                  placeholder="Select gender"
                  className="max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                  selectedKeys={[gender]}
                >
                  <SelectItem key="male" value="male">
                    Male
                  </SelectItem>
                  <SelectItem key="female" value="female">
                    Female
                  </SelectItem>
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
            <div className="rr3">
              <div style={{ width: "45%" }}>
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
              <div style={{ width: "45%" }}>
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
            </div>
            <Button
              color="secondary"
              style={{ marginTop: "40px", float: "right" }}
              onClick={saveProfile}
              isLoading={btnLoading}
            >
              Save
            </Button>
          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Image
                </ModalHeader>
                <ModalBody>
                  <div
                    className="center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <AvatarEditor
                      image={image}
                      borderRadius={1000}
                      height={400}
                      width={400}
                      scale={zoom}
                      ref={editorRef}
                    />
                    <Slider
                      size="sm"
                      step={0.5}
                      maxValue={5}
                      minValue={1}
                      aria-label="Zoom"
                      defaultValue={1}
                      className="max-w-md"
                      onChange={setZoom}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={setNewSrc}>
                    Apply
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

export default Profile;
