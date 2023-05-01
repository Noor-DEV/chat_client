import React from "react";
import { useNavigate } from "react-router-dom";
import MAIN_URL from "../VARS";
const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [isTablet, setIsTablet] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState({});
  const [token, setToken] = React.useState("");
  const [searchMode, setSearchMode] = React.useState(false);
  const [searchData, setSearchData] = React.useState("");
  const [allChats, setAllChats] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [selectedChatOtherUser, setSelectedChatOtherUser] =
    React.useState(null);
  const [isGroupSettings, setIsGroupSettings] = React.useState(false);

  React.useEffect(() => {
    let storedToken = null;
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem("user"));
      storedToken = JSON.parse(localStorage.getItem("token"));
    } catch (err) {
      setUserInfo(null);
      setToken(null);
      return;
    }

    setUserInfo(storedUser);
    setToken(storedToken);
    if (!storedUser) {
      return navigate("/");
    }

    fetch(`${MAIN_URL}/chat`, {
      headers: { authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllChats(data);
      });
  }, [navigate, isMenuOpen]); //FETCHES ALL CHATS
  React.useEffect(() => {
    if (!selectedChat) return;
    const chatId = selectedChat._id;
    if (!selectedChat.isGroupChat) {
      const otherUser = selectedChat.users.find((u) => u._id !== userInfo._id);
      setSelectedChatOtherUser(otherUser);
    }
    if (!chatId) return;
    fetch(`${MAIN_URL}/message/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedChatMessages(data);
      });
    setNotifications((prevNots) => {
      return prevNots.filter((not) => not.chat._id !== selectedChat._id);
    });
  }, [selectedChat, isMenuOpen]); //FETCHES ALL MSGS ONCE A CHAT IS SELECTED

  return (
    <ChatContext.Provider
      value={{
        userInfo,
        setUserInfo,
        searchMode,
        setSearchMode,
        searchData,
        setSearchData,
        token,
        setToken,
        allChats,
        setAllChats,
        isTablet,
        setIsTablet,
        isMenuOpen,
        setIsMenuOpen,
        showModal,
        setShowModal,
        modalType,
        setModalType,
        selectedChat,
        setSelectedChat,
        selectedChatMessages,
        setSelectedChatMessages,
        notifications,
        setNotifications,
        selectedChatOtherUser,
        setSelectedChatOtherUser,
        isGroupSettings,
        setIsGroupSettings,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return React.useContext(ChatContext);
};

export default ChatContext;
