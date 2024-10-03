import React, { memo, useEffect, useState } from "react";
import "../../Styles/BlogReadScreen.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NAvBar from "../../components/NAvBar";
const BlogReadScreen = () => {
  const location = useLocation();
  const [blog, setBlog] = useState(null);
const id=location.state.id || location.state._id
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) {
          console.log("No blog id");
          return;
        }
        const res = await axios.get(
          `http://localhost:5000/api/user/getBlogById${id}`
        );
        if (res.status === 200) {
          setBlog(res.data); // Set user data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]); // Dependency array is empty, so this effect only runs once

  return (
    <div>
      <NAvBar disableScreen={true} />
      <h1 className="BlogPostTitle" >{blog?.data?.title}</h1>
      <div
        className="BlogPostContainer"
        dangerouslySetInnerHTML={{ __html: blog?.data?.content }}
      />

    </div>
  );
};

export default memo(BlogReadScreen);
