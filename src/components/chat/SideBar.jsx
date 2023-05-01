import React from "react";
import SideBarProfile from "./SideBarProfile";
import SideBarTexts from "./SideBarTexts";
import SearchAndNewGroup from "./SearchAndNewGroup";
import { ChatState } from "../../Context/ChatProvider";

const SideBar = (props) => {
  const { searchMode, setSearchMode } = ChatState();
  return (
    <div
      id="custom-bars"
      className={`font-arapey text-white bg-custom-sidebarBg w-full md:w-2/5 h-screen overflow-y-auto `}
    >
      <SideBarProfile />
      <div>
        <SearchAndNewGroup
          searchMode={searchMode}
          setSearchMode={setSearchMode}
        />

        <SideBarTexts />
      </div>
    </div>
  );
};

export default SideBar;
