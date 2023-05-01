import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import MAIN_URL from "../../VARS";

const SearchUser = ({ _id, email, profile_pic, name }) => {
  const {
    token,
    userInfo,
    allChats,
    setAllChats,
    setSelectedChat,
    setSearchMode,
  } = ChatState();
  const accessChat = () => {
    fetch(`${MAIN_URL}/chat`, {
      method: "POST",
      body: JSON.stringify({ userId: _id }),
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
          setSelectedChat(data);
          setSearchMode(false);
        } else {
          console.log("CHAT ALREADY EXISTS...");
          alert("CHAT ALREADY EXISTS....");
        }
      });
  };
  return (
    <div
      className="flex justify-start items-center cursor-pointer text-white hover:text-gray-600 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
      onClick={accessChat}
    >
      <div className="overflow-hidden h-8 w-8 mri-2 rounded-full">
        <img src={profile_pic} alt="" />
      </div>
      <div className="flex-grow font-medium px-2 text-md tracking-wider">
        {name}
      </div>
      <div className="text-sm font-normal  tracking-wide">{email}</div>
    </div>
  );
};

export default SearchUser;
