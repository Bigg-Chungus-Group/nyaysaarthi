import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@nextui-org/react";
import React, { useEffect } from "react";
import { app } from "../../../../firebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Chat = ({ currentChat }) => {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef(null);
  const fb = getFirestore(app);
  const chatBoxRef = React.useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [currentChat]);

  const handleMessage = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
    setMessage(e.target.value);
  };

  const convertToTime = (timestamp) => {
    const date = new Date(timestamp?.seconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  const sendMessage = () => {
    const messageObj = {
      to: "S",
      message,
      timestamp: Timestamp.now(),
      CR: true,
      SR: false,
    };

    const chatRef = doc(fb, "messages", currentChat?.chat?.id);
    updateDoc(chatRef, {
      messages: arrayUnion(messageObj),
    });

    setMessage("");
    inputRef.current.value = "";

    setTimeout(() => {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, 50);
  };

  if (currentChat) {
    return (
      <>
        <Box width="70%" bg="gray.200">
          <Flex
            align="center"
            pl="20px"
            borderBottom="1px solid gray.300"
            bg="gray.100"
            height="10vh"
            gap="20px"
          >
            <Avatar
              src={currentChat?.providerProfile}
              size="large"
              alt="Profile Picture"
            />
            <h1>
              {currentChat?.providerFname} {currentChat?.providerLname}
            </h1>
          </Flex>

          <Flex
            height="72vh"
            overflowY="auto"
            direction="column"
            width="70vw"
            ref={chatBoxRef}
          >
            {currentChat?.chat?.messages?.map((item) => (
              <Box
                key={item?.timestamp}
                p="5px 10px"
                m="10px"
                bg={item?.to === "C" ? "lightgreen" : "gray.300"}
                borderRadius="10px"
                boxShadow="0px 0px 5px 0px rgba(0,0,0,0.1)"
                width="fit-content"
                minWidth="100px"
                mx="20px"
                display="block"
                alignSelf={item?.to === "S" ? "flex-end" : "flex-start"}
              >
                {item?.message}
                <Text fontSize="10px" textAlign="end">
                  {convertToTime(item?.timestamp)}
                </Text>
              </Box>
            ))}
          </Flex>

          <Flex
            align="center"
            borderTop="1px solid gray.300"
            bg="gray.100"
            height="7.5vh"
            gap="20px"
          >
            <input
              type="text"
              placeholder="Type a message..."
              style={{
                border: "none",
                outline: "none",
                width: "94%",
                height: "100%",
                fontSize: "13px",
                paddingLeft: "20px",
              }}
              onKeyUp={handleMessage}
              ref={inputRef}
            />
            <i
              className="fa-solid fa-paper-plane"
              style={{ fontSize: "20px", cursor: "pointer" }}
            ></i>
          </Flex>
        </Box>
      </>
    );
  } else {
    return (
      <Flex align="center" justify="center" bg="gray.200" width="70vw">
        No Conversation Open
      </Flex>
    );
  }
};

export default Chat;
