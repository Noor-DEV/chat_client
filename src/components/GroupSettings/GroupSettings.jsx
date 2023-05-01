import React from "react";
import { ChatState } from "../../Context/ChatProvider";

import GroupAdmin from "./GroupAdmin";
import GroupUser from "./GroupUser";
import { FiArrowRight } from "react-icons/fi";
import { BsGear } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import MAIN_URL from "../../VARS";
import Loading from "../extra-functionality/Loading";

const GroupSettings = () => {
  const {
    selectedChat,
    isTablet,
    setIsMenuOpen,
    setSelectedChat,
    setSelectedChatMessages,
    setIsGroupSettings,
    token,
    setAllChats,
    selectedChatOtherUser,
    setSelectedChatOtherUser,
    setModalType,
    setShowModal,
    userInfo,
    allChats,
  } = ChatState();
  const nameRef = React.useRef();
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [newName, setNewName] = React.useState(selectedChat.chatName);
  const [isNameChanged, setIsNameChanged] = React.useState(false);
  const [nameLoading, setNameLoading] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(
    selectedChat.groupAdmin._id === userInfo._id
  );
  const [isLeaveLoading, setIsLeaveLoading] = React.useState(false);
  React.useEffect(() => {
    if (selectedChat.isGroupChat) {
      setIsAdmin(selectedChat.groupAdmin._id === userInfo._id);
    }
  }, [selectedChat, userInfo]);

  React.useEffect(() => {
    if (selectedChat.chatName !== newName) {
      if (!isNameChanged) setIsNameChanged(true);
    } else {
      if (isNameChanged) setIsNameChanged(false);
    }
  }, [newName]);

  const handleViewProfile = (user) => {
    if (user._id === userInfo._id) {
      setModalType("my-profile");
      setShowModal(true);
      return;
    }
    setModalType("view-profile");
    setShowModal(true);
    setSelectedChatOtherUser(user);
  };
  const handleAddToChat = (user) => {
    fetch(`${MAIN_URL}/chat`, {
      method: "POST",
      body: JSON.stringify({ userId: user._id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const doesChatExist = allChats.find((chat) => chat._id === data._id);
        if (!doesChatExist) {
          setAllChats([data, ...allChats]);
        } else {
          console.log("CHAT ALREADY EXISTS...");
          alert("CHAT ALREADY EXISTS....");
        }
      });
  };
  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };
  const handleAddingUsersToGroup = () => {
    setShowModal(true);
    setModalType("add-users-to-group");
  };
  const handleLeaveGroup = () => {
    if (isAdmin) {
      setShowModal(true);
      setModalType("admin-leaving");
    } else {
      setIsLeaveLoading(true);
      fetch(`${MAIN_URL}/chat/group/remove`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userInfo._id,
          chatId: selectedChat._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLeaveLoading(false);
          setIsGroupSettings(false);
          setAllChats((prevChats) => {
            return prevChats.filter((c) => c._id !== data._id);
          });
          setSelectedChat(null);
          setIsMenuOpen(false);
        });
    }
  };
  return (
    <div
      className={`flex flex-col bg-custom-chatBg text-white w-full lg:w-full  min-h-screen overflow-auto h-screen relative`}
      id="custom-bars"
    >
      <div className="mb-8">
        <div
          className={`bg-black px-6 py-4 z-10 bg-red-5000 flex py-2 justify-start items-center px-6 sticky top-0 relative`}
        >
          <button
            onClick={() => setIsGroupSettings(false)}
            className="fixed right-4"
          >
            <FiArrowRight size={25} />
          </button>
          <div className="flex">
            <span className="mr-4">
              <BsGear size={25} />
            </span>
            <h1 className="font-bold text-xl tracking-widest">
              {selectedChat.chatName} Settings
            </h1>
          </div>
        </div>

        <div className="flex flex-col mx-4 mt-4 ">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="overflow-hidden rounded-lg lg:mr-2 w-full relative bg-slate-800">
              {!nameLoading ? (
                <div className="p-4 relative h-full">
                  <h1 className="tracking-wider text-green-400 font-bold">
                    Group Name
                  </h1>

                  <input
                    type="text"
                    value={newName}
                    onChange={handleInputChange}
                    ref={nameRef}
                    className={`text-white tracking-widest ${
                      isEditingName
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    } font-bold text-xl bg-custom-fullOp outline-none mt-2 pb-1 focus:border-b-2 mb-8 lg:mb-0`}
                    onBlur={() => setIsEditingName(false)}
                  />
                  <button
                    className="flex justify-center items-center tracking-wide rounded-md absolute bg-sred-600 bottom-2 left-4 text-red-400 hover:text-red-700"
                    onClick={() => {
                      setIsEditingName(true);
                      nameRef.current.focus();
                    }}
                  >
                    <span className="mr-2">Edit Group Name</span>
                    <BiEdit size={20} />
                  </button>
                  {isNameChanged && (
                    <button
                      className="flex justify-center items-center tracking-wide rounded-md absolute bg-sred-600 bottom-2 right-4 text-red-400 hover:text-red-700"
                      onClick={() => {
                        setIsNameChanged(false);
                        setNameLoading(true);
                        fetch(`${MAIN_URL}/chat/group/rename`, {
                          method: "POST",
                          body: JSON.stringify({
                            chatId: selectedChat._id,
                            chatName: newName,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            setNameLoading(false);
                            setSelectedChat(data);
                            setAllChats((prevChats) => {
                              return prevChats.map((c) => {
                                if (c._id === data._id) return data;
                                return c;
                              });
                            });
                          })
                          .catch((err) => {
                            console.log(
                              err,
                              "........ERROR RENAMING GRP......"
                            );
                          });
                      }}
                    >
                      <span className="mr-2">Submit Changes</span>
                    </button>
                  )}
                </div>
              ) : (
                <Loading />
              )}
            </div>

            <GroupAdmin
              user={selectedChat.groupAdmin}
              handleViewProfile={handleViewProfile}
              handleAddToChat={handleAddToChat}
            />
          </div>
          <div
            className={`${
              isAdmin && "flex justify-between"
            } pb-2 mt-4 tracking-widest font-bold text-xl`}
          >
            <h1 className="border-b-2 border-slate-300">Users</h1>
            {isAdmin && (
              <button
                className="bg-slate-100 text-slate-800 py-2 px-4 rounded-lg hover:bg-slate-800 hover:text-slate-100"
                onClick={handleAddingUsersToGroup}
              >
                Add Users To The Group
              </button>
            )}
          </div>
          <div className="bg-grseen-800  grid-cols-2 xl:grid gap-2.5 xl:mt-4">
            {selectedChat.users
              .filter(
                (u) =>
                  u._id !== selectedChat.groupAdmin._id &&
                  u._id !== userInfo._id
              )
              .map((user) => {
                return (
                  <GroupUser
                    user={user}
                    handleViewProfile={handleViewProfile}
                    handleAddToChat={handleAddToChat}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-auto pt-2 pb-4">
        {isLeaveLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <button
            className="tracking-widest text-center hover:text-red-600 text-2xl font-bold cursor-pointer text-red-900"
            onClick={handleLeaveGroup}
          >
            Leave Group
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupSettings;
