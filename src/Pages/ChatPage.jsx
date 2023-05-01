import { useCallback, useEffect } from "react";
import SideBar from "../components/chat/SideBar";
import MainChat from "../components/chat/MainChat";
import GroupSettings from "../components/GroupSettings/GroupSettings";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const navigate = useNavigate();
  const {
    userInfo,
    isTablet,
    setIsTablet,
    isMenuOpen,
    setIsMenuOpen,
    isGroupSettings,
  } = ChatState();

  useEffect(() => {
    (function () {
      if (!userInfo) {
        navigate("/");
      }
      if (window.innerWidth >= 768) {
        setIsTablet(true);
      } else {
        if (isTablet) {
          setIsTablet(false);
        }
      }
    })();
  }, [userInfo, isTablet]);

  useEffect(() => {
    const resizeListener = (args) => {
      if (window.innerWidth >= 768) {
        setIsTablet(true);
      } else {
        if (isTablet) {
          setIsTablet(false);
        }
      }
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [window.innerWidth]);
  window.addEventListener("resize", (args) => {
    if (window.innerWidth >= 768) {
      setIsTablet(true);
    } else {
      if (isTablet) {
        setIsTablet(false);
      }
    }
  });
  useEffect(() => {
    const resizeListener = (args) => {
      if (window.innerWidth >= 768) {
        setIsTablet(true);
      } else {
        if (isTablet) {
          setIsTablet(false);
        }
      }
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  });
  const fetchChats = useCallback(() => {}, []);
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div id="chatPage" className="hidden">
      {isTablet ? (
        <>
          <SideBar isTablet={isTablet} />
          {isGroupSettings ? (
            <GroupSettings isTablet={isTablet} />
          ) : (
            <MainChat isTablet={isTablet} />
          )}
        </>
      ) : isMenuOpen ? (
        <SideBar isTablet={isTablet} setIsMenuOpen={setIsMenuOpen} />
      ) : isGroupSettings ? (
        <GroupSettings />
      ) : (
        <MainChat isTablet={isTablet} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default ChatPage;
