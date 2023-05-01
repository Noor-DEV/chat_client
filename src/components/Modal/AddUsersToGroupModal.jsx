import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import SearchUsers from "../chat/SearchUsers";
import { FiX, FiSearch } from "react-icons/fi";
import MAIN_URL from "../../VARS";
import Loading from "../extra-functionality/Loading";
const AddUsersToGroupModal = () => {
  const { selectedChat, token, setSelectedChat, setModalType, setShowModal } =
    ChatState();
  const [potentialUsers, setPotentialUsers] = React.useState([]);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const removeFromAddedUsers = (the_user_id) => {
    return setPotentialUsers((prevUsers) => {
      return prevUsers.filter((user) => user._id !== the_user_id);
    });
  };
  const add2addedUsers = (the_user) => {
    const user_exists = potentialUsers.find(
      (user) => user._id === the_user._id
    );
    if (user_exists) {
      alert("USER ALREADY ADDED...");
      return;
    }
    setPotentialUsers((prevUsers) => {
      return [...prevUsers, the_user];
    });
  };
  const handleAddingUsersToGroup = () => {
    if (
      potentialUsers.length === 0 ||
      !potentialUsers ||
      !potentialUsers.length
    ) {
      return alert(
        "YOU HAVE CHOSEN NO USERS TO ADD TO THE GROUP.. Try selecting some users."
      );
    }
    if (potentialUsers.length === 1) {
      setIsModalLoading(true);
      fetch(`${MAIN_URL}/chat/group/add`, {
        method: "PATCH",
        body: JSON.stringify({
          chatId: selectedChat._id,
          userId: potentialUsers[0]._id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsModalLoading(false);
          setSelectedChat(data);
          setShowModal(false);
          setModalType(null);
        })
        .catch((err) => {
          console.log(err, "...........Error Adding User To Group..........");
        });
    }
    if (potentialUsers.length > 1) {
      setIsModalLoading(true);
      fetch(`${MAIN_URL}/chat/group/add/bunch`, {
        method: "PATCH",
        body: JSON.stringify({
          chatId: selectedChat._id,
          users_list: potentialUsers,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsModalLoading(false);
          setIsModalLoading(false);
          setSelectedChat(data);
          setShowModal(false);
          setModalType(null);
        })
        .catch((err) => {
          console.log(err, "...........Error Adding User To Group..........");
        });
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-left text-2xl font-bold tracking-widest min-h-20">
        Add Users To {selectedChat.chatName}
      </h1>
      <UsersList
        users={potentialUsers}
        removeFromAddedUsers={removeFromAddedUsers}
      />

      {isModalLoading ? (
        <div className="p-4">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col mx-auto">
            <SearchUsersFunctionality add2addedUsers={add2addedUsers} />
          </div>
          {potentialUsers.length > 0 && (
            <button
              className="bg-slate-800 text-slate-100 border-slate-800 border-2 px-8 rounded-full hover:bg-slate-100 hover:text-slate-800 py-2"
              onClick={handleAddingUsersToGroup}
            >
              Add {potentialUsers.length > 1 ? "Users" : "User"} To Group
            </button>
          )}
        </>
      )}
    </div>
  );
};
function UsersList({ users, removeFromAddedUsers }) {
  return (
    users.length > 0 && (
      <>
        <h1 className="block w-5/6  text-xl font-bold tracking-wide">Users</h1>
        <div className="flex flex-wrap w-5/6 justify-start py-2 h-auto">
          {users.map((user) => {
            return (
              <div
                className="bg-custom-op mx-1 px-2 rounded-sm flex items-center m-1"
                key={user._id}
              >
                <h1>{user.name}</h1>
                <button
                  className="ml-1"
                  onClick={() => removeFromAddedUsers(user._id)}
                >
                  <FiX />
                </button>
              </div>
            );
          })}
        </div>
      </>
    )
  );
}

const SearchUsersFunctionality = ({ add2addedUsers }) => {
  const inputRef = React.useRef();
  const { token, selectedChat } = ChatState();
  const [searchUsers, setSearchUsers] = React.useState([]);
  const handleSearchInput = async (e) => {
    const searchURL = `${MAIN_URL}/user?search=${inputRef.current.value}`;
    const response = await fetch(searchURL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    const formattedUsers = responseData.filter((responseUser) => {
      const does_user_exists = selectedChat.users.find(
        (u) => u._id === responseUser._id
      );
      return !does_user_exists;
    });

    setSearchUsers(formattedUsers);
  };
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="bg-custom-sidebarBg text-white shadow-md rounded-lg px-3 py-2 mb-4">
        <div className={`flex items-center rounded-md relative text-white`}>
          <div className={`pl-2 absolute bg-custom-fullOp`}>
            <FiSearch color="#000000bf" size={15} />
          </div>
          <input
            ref={inputRef}
            className="w-full text-blue-700 focus:placeholder-gray-400 placeholder-white rounded-md text-md font-bold tracking-widest bg-red-400 focus:bg-gray-200 focus:text-gray-900 leading-tight focus:outline-none py-2 pr-2 pl-8 text-white"
            id="search"
            type="text"
            placeholder="Search For Users..."
            onChange={handleSearchInput}
          />
        </div>
        <div className="py-3 text-sm text-white">
          {searchUsers.length > 0 ? (
            searchUsers.map((the_user) => {
              return (
                <div
                  className="flex justify-start items-center cursor-pointer text-white hover:text-gray-600 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                  onClick={() => add2addedUsers(the_user)}
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
            })
          ) : (
            <h1>No Users To Display.... Try Searching</h1>
          )}
        </div>
        <div className="flex justify-center border-t-2 text-center border-white text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default AddUsersToGroupModal;
