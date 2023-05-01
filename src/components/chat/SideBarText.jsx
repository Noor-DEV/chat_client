import React from "react";
import { ChatState } from "../../Context/ChatProvider";
const SideBarText = ({ the_chat }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const { users, chatName, isGroupChat, latestMessage = null } = the_chat;
  const {
    userInfo,
    setIsMenuOpen,
    selectedChat,
    setSelectedChat,
    setIsGroupSettings,
  } = ChatState();
  let the_chat_name;
  if (!isGroupChat) {
    const the_other_user = users.find((one) => one._id !== userInfo._id);
    the_chat_name = the_other_user.name;
  } else {
    the_chat_name = chatName;
  }
  const handleChatSelection = () => {
    setSelectedChat(the_chat);
    setIsSelected(true);
    setIsMenuOpen(false);
    setIsGroupSettings(false);
  };
  React.useEffect(() => {
    if (!selectedChat) return;
    if (the_chat._id === selectedChat._id) {
      return setIsSelected(true);
    } else {
      return setIsSelected(false);
    }
  }, [selectedChat]);
  return (
    <div
      id="hoveredUser"
      className={`mb-px h-24 p-4 pl-0 cursor-pointer ${
        isSelected ? "bg-custom-mainChatBg" : "bg-custom-op"
      } hover:bg-custom-sideBarTextHovered`}
      onClick={handleChatSelection}
    >
      <div className="flex  justify-start px-4 items-center">
        <img
          className="w-11 h-11 rounded-full border-custom-circleBorder"
          src="https://static.vecteezy.com/system/resources/thumbnails/020/717/950/small/human-bust-silhouette-avatar-bust-shape-parallel-lines-human-chakra-aura-radiation-of-energy-vector.jpg"
          alt="Profile Picture"
        />
        <div>
          <h1 className="pl-3 font-bold text-xl tracking-wider">
            {the_chat_name}
          </h1>
          <p className="text-left pl-3 ">{latestMessage?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBarText;
