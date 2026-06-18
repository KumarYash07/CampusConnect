import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/userService";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: "",
    });

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]:
        e.target.value,
    });
  };

  const validateForm = () => {
    if (!loginData.email.trim()) {
      return "Email is required";
    }

    if (!loginData.password.trim()) {
      return "Password is required";
    }

    return "";
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    const error =
      validateForm();

    if (error) {
      setMessage(error);
      return;
    }

    try {
      setLoading(true);

      const response =
        await loginUser(
          loginData.email,
          loginData.password
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      setMessage(
        "Login Successful"
      );

      setTimeout(() => {
        navigate(
          "/dashboard"
        );
      }, 1000);

    } catch (error) {

      setMessage(
        error.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Student Login</h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={
            loginData.email
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={
            loginData.password
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Login
        </button>
      </form>

      {loading && (
        <p>Loading...</p>
      )}

      {message && (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Login;