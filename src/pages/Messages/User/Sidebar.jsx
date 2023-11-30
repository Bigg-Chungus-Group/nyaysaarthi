import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@nextui-org/react";
import React, { useEffect } from "react";

const Sidebar = ({ chatMeta, sendOpenEvent }) => {
  useEffect(() => {
    const chats = document.querySelectorAll(".Sidebar > div");
    const chatsArray = Array.from(chats);
    chatsArray?.sort((a, b) => {
      const aTime = a?.querySelector(
        "div > div > div > div:last-child"
      ).innerHTML;
      const bTime = b?.querySelector(
        "div > div > div > div:last-child"
      ).innerHTML;
      return new Date(bTime) - new Date(aTime);
    });
    chatsArray?.forEach((item) =>
      document.querySelector(".Sidebar").appendChild(item)
    );
  }, [chatMeta]);

  const openChat = (id) => {
    const chat = document.getElementById(`chat-${id}`);
    const chats = document.querySelectorAll(".Sidebar > div");
    const chatStatus = document.getElementById(`chat-${id}-status`);

    chats?.forEach((item) => item.classList.remove("active"));
    chatStatus.style.visibility = "hidden";
    chat?.classList.add("active");
    sendOpenEvent(id);
  };

  function formatTime(originalTime) {
    const currentDate = new Date();
    const inputDate = new Date(originalTime);

    // Rule 1: If date is today, show the time in the format: HH:MM (24 Hours)
    if (
      currentDate?.getDate() === inputDate?.getDate() &&
      currentDate?.getMonth() === inputDate?.getMonth() &&
      currentDate?.getFullYear() === inputDate?.getFullYear()
    ) {
      return inputDate?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Rule 2: If date is not today but is the current year, show the time as day and month in the following format: DD-MM
    if (currentDate?.getFullYear() === inputDate?.getFullYear()) {
      const day = inputDate?.getDate().toString().padStart(2, "0");
      const month = (inputDate?.getMonth() + 1).toString().padStart(2, "0");
      return `${day}-${month}`;
    }

    // Rule 3: If the year is not today, show only the year: YYYY
    return inputDate?.getFullYear().toString();
  }

  return (
    <Box width="30%" overflowY="auto" className="Sidebar">
      {chatMeta?.map((item) => (
        <Box
          key={item?.id}
          display="flex"
          alignItems="center"
          p="10px"
          borderBottom="1px solid #ccc"
          _hover={{ backgroundColor: "lightgray" }}
          cursor="pointer"
          transition=".2s"
          onClick={() => openChat(item?.id)}
          id={`chat-${item?.id}`}
          border="5px solid white;"
        >
          <Box>
            <Avatar
              src={item?.image}
              alt="profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </Box>
          <Box ml="10px">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="23vw"
            >
              <Box>
                {item?.providerFname} {item?.providerLname}
              </Box>
              <Box>{formatTime(item?.lastMessageTime)}</Box>
            </Flex>
            <Box>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex align="center" gap="10px">
                  {item?.lastMessageDirection === "C" ? (
                    <i
                      className="fa-solid fa-arrow-right"
                      style={{ fontSize: "13px" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-arrow-left"
                      style={{ fontSize: "13px" }}
                    ></i>
                  )}
                  <Text
                    fontWeight={!item?.lastMessageSeen ? 600 : "normal"}
                  >
                    {item?.lastMessage}
                  </Text>
                </Flex>
                <Box>
                  {!item?.lastMessageSeen ? (
                    <i
                      className="fa-solid fa-circle"
                      style={{ color: "green", fontSize: "7px" }}
                      id={`chat-${item?.id}-status`}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-circle"
                      style={{
                        color: "green",
                        fontSize: "7px",
                        visibility: "hidden",
                      }}
                      id={`chat-${item?.id}-status`}
                    ></i>
                  )}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
