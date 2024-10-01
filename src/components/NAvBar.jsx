import React, { useState } from "react";
import "../Styles/NAvBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NAvBar = ({ disableScreen }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className="navBarConatiner">
      <div className="NavBarWrapper">
        <h1>FreeBlogs.co</h1>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <div className={`navLinksWrapper ${menuOpen ? "open" : ""}`}>
        <Link className="navBarLinks" to="/" replace>
          Home
        </Link>
        {/* {disableScreen === false && (
          <> */}
        <Link className="navBarLinks" to="/AddBlog" replace>
          Categories
        </Link>
        {isLoggedIn ? (
          <>
            <Link className="navBarLinks" to="/AddBlog" replace>
              Add Blog
            </Link>
            <Link className="navBarLinks" to="/MyBlogs" replace>
              My Blogs
            </Link>
          </>
        ) : (
          <Link className="navBarLinks" to="/login" replace>
            Login
          </Link>
        )}
        {/* </> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default NAvBar;
