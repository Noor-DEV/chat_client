import React from "react";
import { FiEdit2, FiEdit } from "react-icons/fi";
import { ChatState } from "../../Context/ChatProvider";
import { useDropzone } from "react-dropzone";

const ProfileModal = ({ type }) => {
  const { userInfo, selectedChatOtherUser } = ChatState();
  const [nameInput, setNameInput] = React.useState(userInfo.name);
  const [colorOne, setColorOne] = React.useState("white");
  const [colorTwo, setColorTwo] = React.useState("white");
  const [editMode, setEditMode] = React.useState(
    type === "my-profile" ? true : false
  );
  const [editingPic, setEditingPic] = React.useState(false);
  const [editingName, setEditingName] = React.useState(false);
  const [newPic, setNewPic] = React.useState(null);
  const [newPicPreview, setNewPicPreview] = React.useState(null);
  const nameRef = React.useRef();
  const picRef = React.useRef();
  const handleDrop = React.useCallback((acceptedFiles) => {
    setNewPic(acceptedFiles[0]);
  }, []);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });
  const handleEditName = (e) => {};
  React.useEffect(() => {
    if (newPic) {
      const the_preview = URL.createObjectURL(newPic);
      setNewPicPreview(the_preview);
    }
  }, [newPic]);

  return (
    <div className={`flex`}>
      <div
        className={`${
          editMode
            ? "w-1/2 md:w-35 pl-4 border-r-2 border-white"
            : "w-2/5 md:w-full"
        }
        ${
          type !== "my-profile" &&
          "flex justify-center items-center flex-col w-full"
        }
        `}
      >
        <h1 className="text-2xl py-2 text-center">
          {type === "my-profile"
            ? "My Profile"
            : `${selectedChatOtherUser.name}'s Profile`}
        </h1>

        <div className="w-40 rounded-full my-2 p-1 h-40 overflow-hidden bg-custom-op mx-auto bg-blue-600">
          <img
            src={
              type === "my-profile"
                ? userInfo.profile_pic
                : selectedChatOtherUser.profile_pic
            }
            alt="my-profile-picture"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex py-2  mb-2 items-center">
          <p>Name:</p>
          <h1 className="mx-2 text-lg font-semibold w-4/6 ">
            {type === "my-profile" ? userInfo.name : selectedChatOtherUser.name}
          </h1>
          {type === "my-profile" && (
            <button
              className="cursor-pointer outline-none border-none"
              onMouseEnter={() => setColorOne("black")}
              onMouseLeave={() => setColorOne("white")}
              onClick={() => {
                nameRef.current.focus();
                setEditMode(true);
              }}
            >
              <FiEdit size={20} color={colorOne} />
            </button>
          )}
        </div>
        <div className="flex py-2  mb-2">
          <p>Email:</p>
          <h1 className="mx-2 text-md font-semibold w-4/6 ">
            {type === "my-profile"
              ? userInfo.email
              : selectedChatOtherUser.email}
          </h1>
        </div>
      </div>
      {editMode && type === "my-profile" && (
        <div className="w-1/2 md:w-3/5 px-4">
          <h1 className="text-2xl pt-2">Edit Profile</h1>
          <div className="h-4/5 flex flex-col justify-between">
            <div className="mb-2 h-auto text-xl font-bold pt-2">
              <h1>Edit Profile Picture </h1>

              <div
                className="relative my-2 bg-custom-op w-full h-40 text-sm  text-center tracking-widest cursor-pointer font-normal flex justify-center items-center hover:bg-custom-op"
                {...getRootProps()}
              >
                <input type="file" {...getInputProps()} />
                {!newPic &&
                  (isDragActive ? (
                    <p>Drop The Image Here...</p>
                  ) : (
                    <p>Click Here or Drop an Image....</p>
                  ))}
                {newPic && newPicPreview && (
                  <>
                    <img
                      src={newPicPreview}
                      alt="Your Image"
                      className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full bg-custom-overlayBg pointer-events-none hover:bg-custom-overlayHoverBg absolute flex justify-center items-center">
                      <p>Click To Change Your Image...</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="h-auto text-xl font-bold pt-2">
              <h1>Edit Profile Picture </h1>
              <input
                type="text"
                placeholder="Edit User Name...."
                className="w-full text-md font-normal tracking-widest placeholder:text-sm placeholder:font-normal bg-custom-op p-4 py-2 my-2 border-none outline-none placeholder-white"
                onChange={handleEditName}
                ref={nameRef}
              />
            </div>
            <button className="bg-custom-chatBg p-2 rounded-full hover:bg-custom-op border-custom-chatBg border-2  mb-2">
              Submit Your Edits
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
