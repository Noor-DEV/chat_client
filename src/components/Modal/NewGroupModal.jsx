import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { FiX } from "react-icons/fi";
import MAIN_URL from "../../VARS";
import SearchUser from "../chat/SearchUser";
import { FiSearch } from "react-icons/fi";
const NewGroupModal = (props) => {
  const [addedUsers, setAddedUsers] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const { token, setAllChats, setShowModal } = ChatState();
  const handleNameChange = (e) => {
    return setGroupName(e.target.value);
  };
  const add2addedUsers = (the_user) => {
    const user_exists = addedUsers.find((user) => user._id === the_user._id);
    if (user_exists) {
      alert("USER ALREADY ADDED...");
      return;
    }
    setAddedUsers((prevUsers) => {
      return [...prevUsers, the_user];
    });
  };
  const removeFromAddedUsers = (the_user_id) => {
    setAddedUsers((prevUsers) => {
      return prevUsers.filter((user) => user._id !== the_user_id);
    });
  };
  const handleGroupCreation = () => {
    if (!addedUsers.length || !groupName || !addedUsers) {
      return alert("PEASE FILL ALL FIELDS APPROPRIATELY..");
    }
    fetch(`${MAIN_URL}/chat/group/create`, {
      method: "POST",
      body: JSON.stringify({ users: addedUsers.map((u) => u._id), groupName }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "........chat-created");
        setAllChats((prevChats) => {
          return [data, ...prevChats];
        });
        alert("CHAT CREATED", data.chatName);
        setShowModal(false);
      });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Create A New Group Chat</h1>
      {groupName && (
        <h1 className="text-left text-2xl font-bold pb-2">{groupName}</h1>
      )}
      <UsersList
        users={addedUsers}
        removeFromAddedUsers={removeFromAddedUsers}
      />
      <div className="flex w-full flex-col mx-auto">
        <label htmlFor="search" className="text-md py-2 font-bold">
          Group Name
        </label>
        <input
          className="mb-2 w-full focus:placeholder-gray-400 placeholder-white rounded-md text-md font-bold tracking-widest bg-red-400 focus:bg-gray-200 focus:text-gray-900 leading-tight focus:outline-none py-2 pr-2 pl-8 text-white h-fit"
          id="search"
          type="text"
          placeholder="Enter Group Name"
          onChange={handleNameChange}
          value={groupName}
        />
        <SearchUsersFunctionality add2addedUsers={add2addedUsers} />
      </div>
      <button
        className="font-bold border-2 border-custom-chatBg px-4 py-1 rounded-full w-40 hover:bg-custom-chatBg text-md"
        onClick={handleGroupCreation}
      >
        Create Group
      </button>
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
  const { token } = ChatState();
  const [searchUsers, setSearchUsers] = React.useState([]);
  const handleSearchInput = async (e) => {
    const searchURL = `${MAIN_URL}/user?search=${inputRef.current.value}`;
    const response = await fetch(searchURL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    setSearchUsers(responseData);
    console.log(responseData, "........responseData..........");
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
        <div className="flex justify-center border-t-2 text-center border-white text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
          {/* <button
            onClick={() => setSearchMode(false)}
            className="text-white rounded-lg hover:text-gray-600 bg-red-500 font-bold py-2 px-20 hover:bg-blue-100"
          >
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NewGroupModal;
