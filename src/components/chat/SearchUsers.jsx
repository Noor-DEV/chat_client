import React from "react";
import { FiSearch } from "react-icons/fi";
import SearchUser from "./SearchUser";
import MAIN_URL from "../../VARS";
import { ChatState } from "../../Context/ChatProvider";

const SearchUsers = ({ setSearchMode }) => {
  const inputRef = React.useRef();
  const { token } = ChatState();
  const [searchUsers, setSearchUsers] = React.useState([]);
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
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
            searchUsers.map((the_user) => (
              <SearchUser key={the_user._id} {...the_user} />
            ))
          ) : (
            <h1>No Users To Display.... Try Searching</h1>
          )}
        </div>
        <div className="flex justify-center border-t-2 text-center border-white text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
          <button
            onClick={() => setSearchMode(false)}
            className="text-white rounded-lg hover:text-gray-600 bg-red-500 font-bold py-2 px-20 hover:bg-blue-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
