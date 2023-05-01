import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import SideBarText from "./SideBarText";

const SideBarTexts = () => {
  const { allChats, searchMode, selectedChat } = ChatState();
  console.log(allChats, ".....allChats");

  return (
    <div>
      {searchMode && (
        <p className="font-medium text-2xl tracking-wider px-4 pb-4">
          LATEST CHATS
        </p>
      )}
      {allChats.map((the_chat) => {
        return <SideBarText the_chat={the_chat} key={the_chat._id} />;
      })}
    </div>
  );
};

export default SideBarTexts;
