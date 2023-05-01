import React from "react";
import { FiSearch } from "react-icons/fi";
import { ChatState } from "../../Context/ChatProvider";
import SearchUsers from "./SearchUsers";

const SearchAndNewGroup = ({ searchMode, setSearchMode }) => {
  const { setModalType, setShowModal } = ChatState();
  const handleNewGroupModal = () => {
    setModalType("new-group");
    setShowModal(true);
  };
  return (
    <div className="pl-4 pr-2 py-4 flex  justify-between items-center ">
      {!searchMode && (
        <>
          <p className="font-medium text-xl tracking-wider ">LATEST CHATS</p>
          <div id="btns" className="text-white flex items-center ">
            <button
              id="btn"
              className="bg-white font-semibold tracking-wider  text-center rounded-md p-2 mr-1 text-sm"
              onClick={handleNewGroupModal}
            >
              New Group
            </button>
            <button
              id="btn"
              className=" flex justify-center items-center bg-white font-semibold tracking-wide w-auto text-center rounded-md p-2 text-black  ml-1"
              onClick={() => setSearchMode((prev) => true)}
            >
              <FiSearch color="white" size={25} />
            </button>
          </div>
        </>
      )}
      {searchMode && <SearchUsers setSearchMode={setSearchMode} />}
    </div>
  );
};

export default SearchAndNewGroup;
