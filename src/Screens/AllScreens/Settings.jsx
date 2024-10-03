import React from "react";
import NAvBar from "../../components/NAvBar";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/LoginSlice";
import { replace, useNavigate } from "react-router-dom";
import "../../Styles/Settings.css";
const Settings = () => {
  const navigate = useNavigate();
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
      <div className="SettingsScreenWraper">
        <button className="LogoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
