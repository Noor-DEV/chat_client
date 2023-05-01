import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import Modal from "./components/Modal/Modal";
import { ChatState } from "./Context/ChatProvider";
import SocketProvider from "./Context/SocketProvider";
function App() {
  const {
    showModal,
    modalType,
    token,
    userInfo,
    setSelectedChat,
    setSelectedChatMessages,
  } = ChatState();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={!token && !userInfo ? <HomePage /> : <ChatPageProvided />}
        />
        <Route
          path="/chats"
          element={token && userInfo ? <ChatPageProvided /> : <HomePage />}
        />
      </Routes>
      {showModal && <Modal type={modalType} />}
    </div>
  );
}
const ChatPageProvided = () => {
  return (
    <SocketProvider>
      <ChatPage />
    </SocketProvider>
  );
};

export default App;
