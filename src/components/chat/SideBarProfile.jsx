import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { ChatState } from "../../Context/ChatProvider";
const SideBarProfile = (props) => {
  const { userInfo, setModalType, setShowModal, notifications } = ChatState();
  const [isHovered, setIsHovered] = React.useState(false);
  const handleProfileModal = () => {
    setModalType("my-profile");
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-between p-4 border-white border-b-2">
      <div className="flex items-center">
        <div
          id="profile"
          className=" w-20 h-20 bg-black rounded-full border-custom-circleBorder overflow-hidden border-4"
        >
          <img
            className="w-20 h-20 rounded-full border-custom-circleBorder"
            src={userInfo.profile_pic}
            alt="Profile Picture"
            onClick={handleProfileModal}
          />
        </div>
        <div id="text" className="">
          <p className="font-bold text-2xl pl-4 tracking-widest">
            {userInfo.name}
          </p>
        </div>
      </div>
      <div
        id="Notification"
        className="p-4 pt-2 pr-2 relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-2 ">
          <p className="font-bold text-3xl">
            <AiOutlineBell />
          </p>
        </div>
        {notifications.length > 0 && (
          <p
            className={`bg-custom-myText absolute top-0 right-0 w-8 h-8 rounded-full text-center flex items-center justify-center text-2xl font-semibold font-arapey`}
          >
            {notifications.length}
          </p>
        )}
        {isHovered && notifications.length > 0 && (
          <TheNotifications notifications={notifications} />
        )}
      </div>
    </div>
  );
};
const TheNotifications = ({ notifications }) => {
  const { setSelectedChat, setIsMenuOpen, allChats } = ChatState();
  const handleNotSelection = (chat) => {
    console.log("CHAT SELECTED FROM NOTS");
    const the_chat = allChats.find((c) => c._id === chat._id);
    setSelectedChat(the_chat);
    setIsMenuOpen(false);
  };
  return (
    <div className="bg-gray-300 rounded-2xl rounded-tr-none absolute top-2/3 right-1/2 py-4 w-96 lg:w-80">
      <h1 className="text-black text-lg px-4 font-bold">New Messages</h1>
      {notifications.map((not) => {
        return (
          <div
            className="py-2 px-4 cursor-pointer text-black w-full rounded-sm hover:bg-custom-chatBg hover:text-white border-b-2 border-black"
            onClick={() => handleNotSelection(not.chat)}
          >
            <h1 className="text-sm">
              Message from {not.sender.name} "{not.content}"
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default SideBarProfile;
