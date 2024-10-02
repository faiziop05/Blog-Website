import React from "react";
import NAvBar from "../../components/NAvBar";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/LoginSlice";
import { replace, useNavigate } from "react-router-dom";
const Settings = () => {
    const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    dispatch(setIsLoggedIn(false));
    navigate("/login", { replace });
  };
  return (
    <div>
      <NAvBar />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;
