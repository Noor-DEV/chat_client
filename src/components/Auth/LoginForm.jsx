import React from "react";
import MAIN_URL from "../../VARS";
import { useNavigate } from "react-router-dom";
const LoginForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.email.includes("@") && formData.password) {
      fetch(`${MAIN_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData, "........resData...........");
          localStorage.setItem("user", JSON.stringify(resData.user));
          localStorage.setItem("token", JSON.stringify(resData.token));
          navigate("/chats");
        });
    }
  };
  return (
    <form className="w-full px-6" onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-white text-sm font-bold mb-1 pl-1"
        >
          Email
        </label>
        <input
          type="email"
          id="password"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          placeholder="Enter your Email here..."
          value={formData.email}
          onChange={handleInputChange}
        />
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
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your Password here..."
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center justify-left  pb-2 w-full">
        <button
          className="w-full lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          type="submit"
        >
          Sign In
        </button>
      </div>
      <a
        className="text-center text-blue-800 block pt-1 pb-2 cursor-pointer hover:underline"
        onClick={() => props.toggleAuthMode()}
      >
        Don't Have an account yet?, Sign Up Instead!
      </a>
    </form>
  );
};

export default LoginForm;
