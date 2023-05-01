import React, { useEffect, useState } from "react";
import { ChatState } from "./ChatProvider";
import { socket } from "../service/socket";
// import io from 'socket.io-client'
export const SocketCtx = React.createContext();
// const socket = io

const SocketProvider = (props) => {
  const {
    userInfo,
    selectedChat,
    isMenuOpen,
    isTablet,
    setSelectedChatMessages,
    selectedChatMessages,
    notifications,
    setNotifications,
  } = ChatState();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [typist, setTypist] = useState(null);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    function onConnect() {
      setIsSocketConnected(true);
    }
    function onDisConnect() {
      setIsSocketConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisConnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisConnect);
    };
  }, []);
  useEffect(() => {
    if (!userInfo) return;
    const onConnected = () => {
      console.log("connected.....io..");
    };
    const handleIncomingMessage = (the_msg) => {
      if (!selectedChat || selectedChat._id !== the_msg.chat._id) {
        return setNotifications((prevNots) => {
          return [...prevNots, the_msg];
        });
      } else {
        return setSelectedChatMessages((prevMsgs) => {
          return [the_msg, ...prevMsgs];
        });
      }
    };

    socket.emit("setup", userInfo);
    socket.on("connected", onConnected);
    if (selectedChat) {
      socket.emit("join room", { room: selectedChat._id, userInfo });
    }
    socket.on("incoming message", handleIncomingMessage);
    const typingStarter = ({ the_chat, user_name }) => {
      if (the_chat === selectedChat._id) {
        setTyping(true);
        setTypist(user_name);
      }
    };
    const typingStopper = () => {
      setTyping(false);
      setTypist(null);
    };
    if (selectedChat) {
      socket.on("typing", typingStarter);
      socket.on("stop typing", typingStopper);
    }
    return () => {
      socket.off("connected", onConnected);
      socket.off("incoming message", handleIncomingMessage);
      socket.off("typing", typingStarter);
      socket.off("stop typing", typingStopper);
    };
  }, [userInfo, selectedChat]);
  const sendNewMessage = (the_new_msg) => {
    console.log("THE_MSG_HAS_BEEN_SENT......");
    socket.emit("new message", the_new_msg);
  };
  const emitTypingStarter = () => {
    socket.emit("typing", {
      the_chat: selectedChat._id,
      user_name: userInfo.name,
    });
  };
  const emitTypingStopper = () => {
    socket.emit("stop typing", {
      the_chat: selectedChat._id,
    });
  };
  useEffect(() => {}, [notifications]);
  return (
    <SocketCtx.Provider
      value={{
        sendNewMessage,
        emitTypingStarter,
        emitTypingStopper,
        typing,
        typist,
        setTyping,
      }}
    >
      {props.children}
    </SocketCtx.Provider>
  );
};

export default SocketProvider;
