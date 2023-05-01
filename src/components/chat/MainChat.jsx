import React from "react";
import TextMessages from "./TextMessages";
import { BsGear } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { ChatState } from "../../Context/ChatProvider";
import MessageForm from "../SendMessage/MessageForm";
import { SocketCtx } from "../../Context/SocketProvider";
const MainChat = ({ isGroupChat = false }) => {
  const toTheBottom = React.useRef();

  const { typing, setTyping, typist } = React.useContext(SocketCtx);

  const {
    setIsMenuOpen,
    isTablet,
    setModalType,
    setShowModal,
    selectedChat,
    setSelectedChat,
    selectedChatMessages,
    setSelectedChatMessages,
    userInfo,
    setIsGroupSettings,
  } = ChatState();
  const handleGroupSettings = () => {
    setIsGroupSettings(true);
  };
  const handleViewProfile = () => {
    setModalType("view-profile");
    setShowModal(true);
  };
  React.useEffect(() => {
    if (toTheBottom.current) {
      toTheBottom.current.scrollIntoView();
    }
  }, [toTheBottom.current, selectedChat, selectedChatMessages]);

  const getTheOtherUser = () => {
    const the_users = selectedChat.users;
    const the_sender = the_users.find((u) => u._id !== userInfo._id);
    return the_sender.name;
  };

  return (
    <div
      className={`bg-custom-chatBg text-white w-full md:w-full  min-h-screen overflow-auto h-screen relative`}
      id="custom-bars"
    >
      {selectedChat ? (
        <>
          <div
            id="banner"
            className={`bg-black z-10 flex py-2 justify-between items-center px-6 sticky top-0`}
          >
            {!isTablet && (
              <p className="cursor-pointer">
                <FiArrowLeft
                  size={25}
                  onClick={() => {
                    setIsMenuOpen(true);
                    setSelectedChat(null);
                    setSelectedChatMessages(null);
                  }}
                />
              </p>
            )}
            <p className={`p-2 font-bold text-2xl tracking-widest font-arapey`}>
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : getTheOtherUser()}
              {typing &&
                (selectedChat.isGroupChat ? (
                  <span className="block text-xs text-center text-white ml-2">
                    {typist} is Typing...
                  </span>
                ) : (
                  <span className="block text-xs text-center text-white ml-2">
                    Typing...
                  </span>
                ))}
            </p>
            {selectedChat.isGroupChat ? (
              <p className="cursor-pointer pr-2" onClick={handleGroupSettings}>
                <BsGear size={30} />
              </p>
            ) : (
              <p className="cursor-pointer pr-2" onClick={handleViewProfile}>
                <AiOutlineEye size={30} />
              </p>
            )}
          </div>
          <TextMessages isTablet={isTablet} />
          {/* {
            isTyping &&
            selectedChat.isGroupChat ? (
              <h1 className="text-sm  text-white ml-2">is Typing...</h1>
            ) : (
              <h1 className="text-sm  text-white ml-2">Typing...</h1>
            )
          } */}
          <div ref={toTheBottom}></div>
          <MessageForm />
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="bg-custom-op p-8 text-xl">
            Select a chat to view your messages...
          </h1>
        </div>
      )}
    </div>
  );
};

export default MainChat;
