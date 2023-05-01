import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import SignUpForm from "../components/Auth/SignUpForm";
import { ChatState } from "../Context/ChatProvider";
const HomePage = () => {
  const { userInfo } = ChatState();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  React.useEffect(() => {
    if (userInfo) {
      return navigate("/chats");
    }
  }, [navigate]);
  const toggleAuthMode = () => {
    return setIsLogin((prevLoginState) => !prevLoginState);
  };
  return (
    <div id="container-HomePage">
      <div
        id="overlay"
        className=" bg-white w-full flex justify-center items-center"
      >
        {/* BOX */}
        <div
          className={`${
            isLogin ? "md:w-1/3" : "md:w-2/5"
          }  text-gray-600 h-4/5`}
        >
          <div className="bg-custom-op text-white text-center mb-2">
            <p className="p-2 text-5xl font-extrabold tracking-widest font-tiltPrism">
              Talk-A-Tive
            </p>
          </div>
          {/* ANOTHER BOX ** HAS INPUTS*/}
          <div
            className={`bg-custom-op w-full ${
              isLogin ? "pt-5" : "pt-5"
            } bg-blue-600`}
          >
            {isLogin ? (
              <LoginForm toggleAuthMode={toggleAuthMode} />
            ) : (
              <SignUpForm toggleAuthMode={toggleAuthMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
