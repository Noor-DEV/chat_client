import React from "react";
import TextMsg from "./TextMsg";
import { ChatState } from "../../Context/ChatProvider";

// const msgs = [
//   {
//     id: 1,
//     isMe: true,
//     name: "NOOR HASSAN",
//     profile:
//       "https://static.vecteezy.com/system/resources/thumbnails/020/717/950/small/human-bust-silhouette-avatar-bust-shape-parallel-lines-human-chakra-aura-radiation-of-energy-vector.jpg",
//     msg: "Hi, How are you doing? it's been a long time eversince... How's everything....",
//   },
// ];
const TextMessages = (props) => {
  const { selectedChatMessages, userInfo } = ChatState();

  return (
    <div className="relative min-h-screen" id="auto-scroll">
      {selectedChatMessages?.map((message) => {
        return (
          <TextMsg
            key={message._id}
            message={message}
            isTablet={props.isTablet}
          />
        );
      })}
    </div>
  );
};

export default TextMessages;
