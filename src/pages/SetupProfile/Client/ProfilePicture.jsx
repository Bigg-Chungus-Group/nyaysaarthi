import { Box, Center, Text } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  Slider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import AvatarEditor from "react-avatar-editor";

const ProfilePicture = ({
  personalInfo,
  locationInfo,
  license,
  acceptBack4,
}) => {
  const [zoom, setZoom] = React.useState(1);
  const [avatar, setAvatar] = React.useState(null);
  const AvatarEditorRef = React.useRef(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const selectPfp = () => {
    document.getElementById("pfp").click();
  };

  const setPfp = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      onOpen();
    }
  };

  const setPrev = () => {
    const canvas = AvatarEditorRef.current.getImageScaledToCanvas();
    const url = canvas.toDataURL();
    setAvatar(url);
    onOpenChange();
  };

  const pfpRef = React.useRef(null);

  const goBack = () => {
    pfpRef.current.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      pfpRef.current.style.display = "none";
      acceptBack4();
    }, 700);
  };

  return (
    <Box className="pfp animate__animated animate__fadeInUp" ref={pfpRef}>
      <Text>Want to set a Profile Picture Now?</Text>
      <Text fontSize="13px" mb="30px">
        Don't worry, you can set it later too!
      </Text>

      <Box className="img-wrapper">
        <Avatar
          className="img"
          size="lg"
          style={{ width: "150px", height: "150px" }}
          src={avatar}
        />
        <Box className="img-overlay" onClick={selectPfp}>
          <i className="fa-solid fa-pen"></i>
        </Box>
        <input type="file" id="pfp" onChange={setPfp} hidden accept="image/*" />
      </Box>

      <Center mt="30px" gap="10px">
        <Button color="danger" auto onClick={goBack}>
          Back
        </Button>
        <Button color="primary" auto>
          Submit
        </Button>
      </Center>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Adjust Profile Picture</ModalHeader>
              <ModalBody>
                <AvatarEditor
                  image={avatar}
                  width={250}
                  height={250}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={zoom}
                  rotate={0}
                  ref={AvatarEditorRef}
                />
                <Slider
                  value={zoom}
                  onChange={setZoom}
                  aria-label="Zoom"
                  color="primary"
                  style={{ marginTop: "20px" }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  auto
                  onClick={() => {
                    setPrev();
                  }}
                >
                  Done
                </Button>
              </ModalFooter>{" "}
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePicture;
