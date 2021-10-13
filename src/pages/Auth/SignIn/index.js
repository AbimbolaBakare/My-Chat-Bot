import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { history } from "../../../App";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((fields) => ({ ...fields, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${baseUrl}/auth/login`, data)
      .then((res) => {
        setLoading(false);
        sessionStorage.setItem("token", res.data.access_token);
        history.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        alert("An error occured. Please try again");
      });
  };

  return (
    <div className="login-page">
      <div className="form">
        <h4>WELCOME BACK, PLEASE SIGN IN TO CONTINUE</h4>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{loading ? "Please Wait..." : "Login"}</button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};
