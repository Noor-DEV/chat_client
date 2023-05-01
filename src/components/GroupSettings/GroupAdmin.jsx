import { ChatState } from "../../Context/ChatProvider";

const GroupAdmin = (props) => {
  const { userInfo } = ChatState();
  return (
    <div className="bg-slate-100 text-gray-700 rounded-lg mt-4 lg:mt-0 w-full">
      <h1 className="text-xl font-bold tracking-widest p-2 border-b-2 border-gray-700">
        Group Admin
      </h1>
      <div className="rounded-lg mt-2 flex flex-col lg:flex-row bg-inherit items-start lg:items-center justify-left lg:justify-center lg:h-24 overflow-hidden w-full lg:w-full p-2 lg:p-0 lg:pl-2 relative">
        <img
          src={props.user.profile_pic}
          alt=""
          className="h-16 w-16 border-2  border-custom-circleBorder rounded-full xl:w-20 xl:h-20 object-cover justify-self-start lg:mb-4"
        />
        <div className="pl-2 w-full">
          <h1 className="absolute lg:relative top-4 left-20 lg:top-0 lg:left-0 text-xl font-semibold tracking-widest uppercase">
            {props.user.name}
          </h1>
          <h1 className="text-center lg:text-left ml-6 lg:ml-0 absolute lg:relative top-10 left-14 lg:top-0 lg:left-0">
            {props.user.email}
          </h1>
          <div className="flex mt-4 lg:mt-2 w-full justify-start lg:justify-start pb-2">
            {props.user._id !== userInfo._id && (
              <button
                className="border-2 border-gray-800 text-sm px-4 p-2 mr-2 rounded-full py-1 hover:bg-gray-800 hover:text-white hover:borders-none"
                onClick={() => props.handleAddToChat(props.user)}
              >
                Add To Chats
              </button>
            )}
            <button
              className="text-md text-sm text-whsite border-2 border-gray-300 p-2 py-1 rounded-full px-4 mr-2 hover:bg-gray-300"
              onClick={() => props.handleViewProfile(props.user)}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupAdmin;
