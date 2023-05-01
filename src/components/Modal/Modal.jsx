import React from "react";
import ReactDOM from "react-dom";
import { ChatState } from "../../Context/ChatProvider";
import { GiCancel } from "react-icons/gi";
import NewGroupModal from "./NewGroupModal";
import ProfileModal from "./ProfileModal";
import AddUsersToGroupModal from "./AddUsersToGroupModal";
import AdminLeavingModal from "./AdminLeavingModal";
const Modal = (props) => {
  const { setShowModal } = ChatState();
  const hideModal = () => {
    setShowModal(false);
  };
  return ReactDOM.createPortal(
    <div className="w-full z-20 h-full bg-custom-modalOverlay absolute top-0 left-0 flex justify-center items-center text-white px-6 overflow-auto">
      <div
        id="modal custom-bars"
        className={`w-full h-fit lg:max-w-2xl rounded-lg relative bg-custom-modalBg overflow-hidden ${
          props.type === "view-profile" && "lg:max-w-lg"
        }`}
      >
        {props.type !== "admin-leaving" && (
          <span
            className="absolute top-0 right-0 p-4  cursor-pointer text-xl hover:bg-custom-op"
            onClick={hideModal}
          >
            <GiCancel size={25} />
          </span>
        )}
        {props.type === "my-profile" && <ProfileModal type="my-profile" />}
        {props.type === "view-profile" && <ProfileModal type="view-profile" />}
        {props.type === "new-group" && <NewGroupModal />}
        {props.type === "add-users-to-group" && <AddUsersToGroupModal />}
        {props.type === "admin-leaving" && <AdminLeavingModal />}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
