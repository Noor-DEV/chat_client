import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import MAIN_URL from "../../VARS";
import Loading from "../extra-functionality/Loading";

const AdminLeavingModal = () => {
  const {
    selectedChat,
    setSelectedChat,
    userInfo,
    token,
    allChats,
    setAllChats,
    setModalType,
    setShowModal,
    setIsGroupSettings,
  } = ChatState();
  const [selectedAdmin, setSeletedAdmin] = React.useState(null);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const makeAdmin = () => {
    if (!selectedAdmin) return;
    setIsModalLoading(true);
    fetch(`${MAIN_URL}/chat/group/admin/leave`, {
      method: "PATCH",
      body: JSON.stringify({
        oldAdmin: userInfo._id,
        newAdmin: selectedAdmin._id,
        chatId: selectedChat._id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsModalLoading(false);
        setShowModal(false);
        setModalType(null);
        setAllChats(allChats.filter((c) => c._id !== data._id));
        setIsGroupSettings(false);
        setSelectedChat(null);
      });
  };

  return (
    <div className="p-4 flex justify-center items-center">
      {!isModalLoading ? (
        <div className="mt-4 text-left">
          <h1 className="tracking-widest font-semibold mb-2 text-2xl">
            One Sec! Before You Leave....
          </h1>
          <p className="text-xl tracking-wider">
            Since You're The Group Admin, You'll have to leave The
            responsibility of being the admin to someone else.
          </p>
          <h1 className="text-xl font-bold tracking-widest mt-4">
            Choose Someone As Admin before you leave..
          </h1>
          {selectedChat.users
            .filter((u) => u._id !== userInfo._id)
            .map((the_user) => {
              return (
                <div
                  className="flex justify-start items-center cursor-pointer text-white hover:text-gray-600 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                  onClick={() => setSeletedAdmin(the_user)}
                >
                  <div className="overflow-hidden h-8 w-8 mri-2 rounded-full">
                    <img src={the_user.profile_pic} alt="" />
                  </div>
                  <div className="flex-grow font-medium px-2 text-md tracking-wider">
                    {the_user.name}
                  </div>
                  <div className="text-sm font-normal  tracking-wide">
                    {the_user.email}
                  </div>
                </div>
              );
            })}
          {selectedAdmin && (
            <>
              <div className="mt-4 flex text-xl font-semibold text-emerald-300 tracking-widest">
                <h1 className="mr-2">Chosen Admin: </h1>
                <h1 className="text-xl">{selectedAdmin.name}</h1>
              </div>
              <button
                className="px-4 py-2 bg-slate-800 text-slate-100 mt-4 hover:bg-slate-100 hover:text-slate-800 text-xl font-bold tracking-wider rounded-md"
                onClick={makeAdmin}
              >
                Set A Group Admin
              </button>
            </>
          )}
          <button
            className={`px-4 py-2 bg-slate-800 text-slate-100 mt-4 hover:bg-slate-100 hover:text-slate-800 text-xl font-bold tracking-wider rounded-md ${
              selectedAdmin && "ml-4"
            }`}
            onClick={() => {
              setModalType(null);
              setShowModal(false);
              setSeletedAdmin(null);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="h-80">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default AdminLeavingModal;
