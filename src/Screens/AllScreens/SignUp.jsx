import React, { useState } from "react";
import "../../Styles/Login.css";
import NAvBar from "../../components/NAvBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfermPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (name == "") {
        setError("Enter Full Name");
        return;
      }
      if (userName == "") {
        setError("Enter Username");
        return;
      }
      if (password == "") {
        setError("Enter password");
        return;
      }
      if (Array.from(password).length < 6) {
        setError("Passwords length must be minimun 6");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const data = {
        name: name,
        username: userName,
        password: password,
      };
      
      const res = await axios.post(
        "http://localhost:5000/api/user/signUp",
        data
      );
      if (res.status == 200) {
        alert("Account created, Now please login to continue...")
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NAvBar />
      <div className="LoginScreenWrapper">
        <h1>Create Account</h1>
        <div className="LoginScreenInputLabelWrapper">
          <div>
            <label htmlFor="">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Full Name"
            />
          </div>
          <div>
            <label htmlFor="">Username</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfermPassword(e.target.value)}
              type="text"
              placeholder="Enter Confirm Password"
            />
          </div>
          {error ? error : ""}
          <button onClick={handleSubmit} type="submit">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
