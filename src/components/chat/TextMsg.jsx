import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const TextMsg = ({ message, isTablet }) => {
  const { userInfo } = ChatState();
  const isMe = userInfo._id === message.sender._id;
  const the_other_user = message.chat.users.find((u) => u._id !== userInfo._id);
  return (
    <div
      className={`p-4 px-8 flex flex-col items-start ${isMe && "items-end"}`}
    >
      <div className={`flex items-center ${isMe && "flex-row-reverse"}`}>
        <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-custom-circleBorder m-2">
          <img src={message.sender.profile_pic} alt="profile picture" />
        </div>
        <p className="">{message.sender.name}</p>
      </div>
      <div
        id="text-highlight"
        className={`lg:w-1/2 h-auto  px-8 p-2 text-xl tracking-wide rounded-full ${
          isMe
            ? "rounded-tr-none bg-custom-myText"
            : "rounded-tl-none bg-custom-op"
        } `}
      >
        <p className={`${isTablet && "text-lg"}`}>{message.content}</p>
      </div>
    </div>
  );
};

export default TextMsg;
