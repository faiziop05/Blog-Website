import React, { memo, useEffect, useState } from "react";
import "../../Styles/BlogReadScreen.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NAvBar from "../../components/NAvBar";
const BlogReadScreen = () => {
  const location = useLocation();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!location.state.id) {
          console.log("No blog id");
          return;
        }
        const res = await axios.get(
          `http://localhost:5000/api/user/getBlogById${location.state.id}`
        );
        if (res.status === 200) {
          setBlog(res.data); // Set user data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [location.state.id]); // Dependency array is empty, so this effect only runs once

  console.log(blog?.data);
  return (
    <div>
      <NAvBar disableScreen={true} />
      <div
        className="BlogPostContainer"
        dangerouslySetInnerHTML={{ __html: blog?.data?.content }}
      />
    </div>
  );
};

export default memo(BlogReadScreen);
