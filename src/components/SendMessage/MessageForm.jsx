import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import MAIN_URL from "../../VARS";
import { SocketCtx } from "../../Context/SocketProvider";
const MessageForm = ({}) => {
  const [content, setContent] = React.useState("");
  const { token, selectedChat, setSelectedChatMessages } = ChatState();
  const { sendNewMessage, emitTypingStarter, emitTypingStopper } =
    React.useContext(SocketCtx);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!content) return alert("ENTER MESSAGE 2 SEND");
    fetch(`${MAIN_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: content, chatId: selectedChat._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedChatMessages((prev) => {
          return [...prev, data];
        });
        setContent("");
        sendNewMessage(data);
      });
  };
  let timer;
  const handleInputChange = (e) => {
    clearTimeout(timer);
    const lastTimeTyping = new Date().getTime();
    setContent(e.target.value);
    emitTypingStarter();
    const interval = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastTimeTyping >= interval) {
        emitTypingStopper();
        clearTimeout(timer);
      }
    }, interval);
  };
  return (
    <form
      className="w-full bg-custom-chatBg h-16 bottom-0 right-0 flex items-center px-6 sticky"
      id="message-form"
    >
      <div className="w-full flex items-center relative">
        <input
          type="text"
          placeholder="Type Here..."
          className="placeholder-white w-full bg-custom-inputBg text-white px-6 py-2 rounded-full outline-none"
          value={content}
          onChange={handleInputChange}
        />
        <button
          className="absolute hover:bg-custom-myText right-0 rounded-full py-1 mr-2 w-28 bg-custom-circleBorder"
          type="submit"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </form>
  );
};
export default MessageForm;
