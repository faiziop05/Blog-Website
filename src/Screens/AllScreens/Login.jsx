import React, { useState } from "react";
import "../../Styles/Login.css";
import NAvBar from "../../components/NAvBar";
import { Link, Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/LoginSlice";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handleSubmit = async () => {
    try {
      if (userName == "") {
        setError("Enter Username");
        return;
      }
      if (password == "") {
        setError("Enter password");
        return;
      }

      const data = {
        username: userName,
        password: password,
      };
      
      const res = await axios.post(
        "http://localhost:5000/api/user/signIn",
        data
      );
      if (res.status == 200) {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('role',res.data.role)
        dispatch(setIsLoggedIn(true))
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NAvBar />
      <div className="LoginScreenWrapper">
        <h1>Login</h1>
        <div className="LoginScreenInputLabelWrapper">
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
          <button onClick={handleSubmit} type="submit">
            Login
          </button>
        </div>
        <div className="donotHaveaccountwarpper">
          <p>Don't have an account!</p>
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
