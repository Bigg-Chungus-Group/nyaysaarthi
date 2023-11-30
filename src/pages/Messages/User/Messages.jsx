import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Navbar from "../../../Components/User/Navbar/Navbar";
import "./Messages.css";
import { app } from "../../../../firebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  where,
  getDocs,
  query,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Messages = () => {
  const [chats, setChats] = React.useState([]);
  const [chatMeta, setChatMeta] = React.useState([]);
  const [docArray, setDocArray] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const querySnap = query(
          collection(db, "messages"),
          where("client", "==", user.uid)
        );

        const docSnap = await getDocs(querySnap);
        docSnap?.forEach(async (d) => {
          const query2 = doc(db, "users", d?.data()?.provider);
          const docSnap2 = await getDoc(query2);

          const chatMeta = {
            id: d?.id,
            providerFname: docSnap2?.data()?.fname,
            providerLname: docSnap2?.data()?.lname,
            lastMessage:
              d?.data()?.messages[d?.data()?.messages?.length - 1]?.message,
            lastMessageTime: d
              ?.data()
              ?.messages[d?.data()?.messages?.length - 1]?.timestamp?.toDate(),
            lastMessageSeen:
              d?.data()?.messages[d?.data()?.messages?.length - 1]?.CR,
            lastMessageDirection:
              d?.data()?.messages[d?.data()?.messages?.length - 1]?.to,
          };

          const chats = {
            id: d?.id,
            messages: d?.data()?.messages,
          };

          setChats((prev) => [...prev, chats]);
          setChatMeta((prev) => [...prev, chatMeta]);
          setDocArray((prev) => [...prev, d?.id]);
        });
      }
    });
  }, []);

  useEffect(() => {
    for (const id of docArray) {
      const docRef = doc(db, "messages", id);
      onSnapshot(docRef, (doc) => {
        setChats((prev) => {
          const index = prev?.findIndex((item) => item?.id === id);
          console.log(prev);
          const newArray = [...prev];
          newArray[index].messages = doc?.data().messages;
          console.log(newArray);
          return newArray;
        });

        setChatMeta((prev) => {
          const index = prev?.findIndex((item) => item?.id === id);
          const newArray = [...prev];
          newArray[index].lastMessage =
            chats[index]?.messages[chats[index]?.messages?.length - 1]?.message;
          newArray[index].lastMessageTime =
            chats[index]?.messages[
              chats[index]?.messages?.length - 1
            ]?.timestamp?.toDate();
          newArray[index].lastMessageSeen =
            chats[index]?.messages[chats[index]?.messages?.length - 1]?.CR;
          newArray[index].lastMessageDirection =
            chats[index]?.messages[chats[index]?.messages?.length - 1]?.to;

          console.log("newArray");
          console.log(newArray);
          return newArray;
        });
      });
    }
  }, [docArray]);

  const sendOpenEvent = (id) => {
    const chat = chats?.find((item) => item?.id === id);
    const meta = chatMeta?.find((item) => item?.id === id);
    setCurrentChat({ ...meta, chat });
  };

  return (
    <>
      <Navbar />
      <Flex height="90vh" className="userMessages">
        <Sidebar chatMeta={chatMeta} sendOpenEvent={sendOpenEvent} />
        <Chat currentChat={currentChat} />
      </Flex>
    </>
  );
};

export default Messages;
