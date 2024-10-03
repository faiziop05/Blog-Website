import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import NAvBar from "../../components/NAvBar";
import axios from "axios";
import HomeCard from "../../components/HomeCard";
import "../../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const MyBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const fetchData = async () => {
    try {
      if (userId) {
        setLoading(true);
        const res = await axios.post(
          `http://localhost:5000/api/user/getMyBlogsById`,
          { userId: userId }
        );
        if (res.status === 200) {
          setData(res.data.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleEdit = (item) => {
    navigate("/AddBlog", { state: item });
  };
  const handleDelete = async (item) => {
    try {
      if (userId && item) {
        setLoading(true);
        const res = await axios.post(
          `http://localhost:5000/api/user/DeleteMyBlogById`,
          { userId: userId, id: item._id }
        );
        if (res.status === 200) {
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NAvBar disableScreen={false} />
      <div className="HomeScreenContainer">
        <h2>My Blogs</h2>

        {loading ? (
          <Loading color={"#9a9cea"} type={"bubbles"} />
        ) : (
          <div className="HomeCardsContainer">
            {data?.map((item) => (
              <div key={item._id} className="HomeCardContinerWithButtons">
                <button
                  onClick={() => navigate("/BlogReadScreen", { state: item })}
                  className="HomeCardButton"
                >
                  <HomeCard data={item} />
                </button>

                <div className="UpdateDeleteButtonWrapper">
                  <FaRegEdit
                    onClick={() => handleEdit(item)}
                    className="BlogEditButton"
                  />
                  <MdDeleteOutline
                    onClick={() => handleDelete(item)}
                    className="BlogDeleteButton"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MyBlogs);
