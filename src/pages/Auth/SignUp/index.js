import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { useHistory } from "react-router";

export const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    sex: "",
    role: "",
    phone_no: "",
    password: "",
    password_again: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((fields) => ({ ...fields, [name]: value }));
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const togglePassword2Visiblity = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${baseUrl}/auth/register`, data)
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
        <h4>PLEASE COMPLETE THE FORM BELOW TO CREATE YOUR ACCOUNT</h4>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            name="phone_no"
            value={data.phone_no}
            onChange={handleChange}
            required
          />
          <select name="sex" value={data.sex} onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={data.age}
            onChange={handleChange}
            required
          />
          <div className="pass-wrapper">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            {passwordShown ? (
              <i
                className="fa fa-eye-slash"
                onClick={togglePasswordVisiblity}
              ></i>
            ) : (
              <i className="fa fa-eye" onClick={togglePasswordVisiblity}></i>
            )}
          </div>

          <div className="pass-wrapper">
            <input
              type={passwordShown2 ? "text" : "password"}
              placeholder="Confirm Password"
              name="password_again"
              value={data.password_again}
              onChange={handleChange}
              required
            />
            {passwordShown2 ? (
              <i
                className="fa fa-eye-slash"
                onClick={togglePassword2Visiblity}
              ></i>
            ) : (
              <i className="fa fa-eye" onClick={togglePassword2Visiblity}></i>
            )}
          </div>
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            required
          >
            <option value="">Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit">
            {loading ? "Please Wait..." : "Create Account"}
          </button>
          <p className="message">
            Already registered? <a href="/">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};
