import React from "react";
import MAIN_URL from "../../VARS";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = React.useState(null);
  const [profilePicPreview, setProfilePicPreview] = React.useState(null);
  const handleDrop = React.useCallback((acceptedFiles) => {
    setProfilePic(acceptedFiles[0]);
    const the_preview = URL.createObjectURL(acceptedFiles[0]);
    setProfilePicPreview(the_preview);
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email.includes("@") ||
      formData.password.length < 5 ||
      formData.password != formData.confirmPassword
    ) {
      alert("FILL THE FORM APPROPRIATELY...");
      return;
    }
    fetch(`${MAIN_URL}/user/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData, "....resData...");
        localStorage.setItem("user", JSON.stringify(resData.user));
        localStorage.setItem("token", JSON.stringify(resData.token));
        navigate("/chats");
      });
  };
  return (
    <form className="w-full px-6" onSubmit={handleFormSubmit}>
      <div className="mb-2 flex flex-wrap">
        <div className="w-full md:w-1/2 md:pr-2">
          <label
            htmlFor="firstName"
            className="block text-white text-sm font-bold mb-1 pl-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="First Name..."
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        {/* 2ND */}
        <div className="w-full md:w-1/2 md:pl-2">
          <label
            htmlFor="lastName"
            className="block text-white text-sm font-bold mb-1 pl-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Last Name..."
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-white text-sm font-bold mb-1 pl-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your Email here..."
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="profilePic"
          className="block text-white text-sm font-bold mb-1 pl-1"
        >
          Profile Picture
        </label>
        <div
          className={`bg-custom-op w-full ${
            profilePic ? "h-40" : "h-20"
          } flex justify-center items-center`}
          id="profilePic"
          {...getRootProps()}
        >
          <input type="file" {...getInputProps()} id="profilePic" />
          {!profilePic ? (
            <>
              {isDragActive ? (
                <p className="text-white px-4 text-center">
                  Drop The Image Here...
                </p>
              ) : (
                <p className="text-white px-4 text-center">
                  Click To Select a Profile Picture or Drag and Drop into Here.
                </p>
              )}
            </>
          ) : (
            <div className="w-full h-full relative">
              <div className="flex justify-center items-center bg-custom-overlayBg absolute top-0 left-0 w-full h-full pointer-events-none">
                {isDragActive ? (
                  <p className="text-white px-4 text-center">
                    Drop The Image Here...
                  </p>
                ) : (
                  <p className="text-white px-4 text-center">
                    Click If you Want to change the Image or Drag and Drop into
                    Here.
                  </p>
                )}
              </div>
              <img
                src={profilePicPreview}
                className="w-full h-full object-cover"
                alt="Selected Profile Picture"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-white text-sm font-bold mb-1 pl-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your Password here..."
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-white text-sm font-bold mb-1 pl-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Confirm your Password here..."
        />
      </div>
      <div className="flex items-center justify-left  pb-5 w-full">
        <button
          className="w-full lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
      <a
        className="text-center text-blue-800 block pt-1 pb-2 cursor-pointer hover:underline"
        onClick={() => props.toggleAuthMode()}
      >
        Already Have an account?, Log in Instead!
      </a>
    </form>
  );
};

export default SignUpForm;
