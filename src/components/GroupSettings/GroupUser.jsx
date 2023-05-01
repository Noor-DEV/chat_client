import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { ChatState } from "../../Context/ChatProvider";
import MAIN_URL from "../../VARS";
import Loading from "../extra-functionality/Loading";
const GroupUser = (props) => {
  const { selectedChat, setSelectedChat, userInfo, token } = ChatState();
  const [isAdmin, setIsAdmin] = React.useState(
    selectedChat.groupAdmin._id === userInfo._id
  );
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (selectedChat.isGroupChat) {
      setIsAdmin(selectedChat.groupAdmin._id === userInfo._id);
    }
  }, [selectedChat, userInfo]);
  const removeFromGroup = (userId) => {
    setIsLoading(true);
    if (!isAdmin) return;
    fetch(`${MAIN_URL}/chat/group/remove`, {
      method: "PATCH",
      body: JSON.stringify({
        userId,
        chatId: selectedChat._id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setSelectedChat(data);
        console.log(data, "...........userRemoved.......");
      })
      .catch((err) => {
        console.log(err, ".....ERROR REMOVING USER FROM GROUP........", userId);
      });
  };
  return (
    <div className="rounded-lg mt-4 xl:m-0 flex flex-col lg:flex-row bg-sneutral-800 bg-slate-800 items-start lg:items-center justify-left lg:justify-center lg:h-24 overflow-hidden w-full lg:w-full p-2 lg:p-0 relative">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <img
            src={props.user.profile_pic}
            alt=""
            className="h-16 w-16 rounded-full lg:rounded-none lg:h-24 lg:w-20 object-cover"
          />
          <div className="pl-2 w-full">
            <h1 className="absolute lg:relative top-6 left-20 lg:top-0 lg:left-0 text-xl font-semibold tracking-widest uppercase">
              {props.user.name}
            </h1>
            <h1 className="text-center lg:text-left ml-6 lg:ml-0 absolute lg:relative top-12 left-14 lg:top-0 lg:left-0">
              {props.user.email}
            </h1>
            <div className="flex mt-4 lg:mt-2 w-full justify-start lg:justify-start pb-2">
              {props.user._id !== userInfo._id && (
                <button
                  className="border-2 border-cyan-800 text-sm px-4 p-2 mr-2 rounded-full py-1 hover:bg-gray-800 hover:text-white hover:borders-none"
                  onClick={() => props.handleAddToChat(props.user)}
                >
                  Add To Chats
                </button>
              )}

              <button
                className="text-md text-sm text-whsite border-2 border-gray-300 p-2 py-1 rounded-full px-4 mr-2 hover:bg-gray-300 hover:text-gray-800"
                onClick={() => props.handleViewProfile(props.user)}
              >
                View Profile
              </button>
              <button
                className={`${
                  isAdmin
                    ? "cursor-pointer hover:text-red-600"
                    : "cursor-not-allowed"
                }`}
                onClick={() => removeFromGroup(props.user._id)}
              >
                <AiFillDelete size={28} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default GroupUser;
