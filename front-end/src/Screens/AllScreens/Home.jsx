import React, { useEffect, useRef, useState } from "react";
import NAvBar from "../../components/NAvBar";
import axios from "axios";
import HomeCard from "../../components/HomeCard";
import "../../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          console.log(res.data);
          
          localStorage.setItem("userId", res.data._id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    fetchUser();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/getBlogs${page}`
      );
      if (res.status === 200) {
        setData((prev) => [...prev, ...res.data.data]);
      }
      if (res.data.total <= page) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading && !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page) {
      fetchData();
    }
  }, [page]);

  return (
    <div>
      <NAvBar disableScreen={false} />
      <div className="HomeScreenContainer">
        <h2>All Blogs</h2>
        <div className="HomeCardsContaineractual">
          {data?.map((item) => (
            <button
              onClick={() => navigate("BlogReadScreen", { state: item })}
              className="HomeCardButton1"
              key={item.id}
            >
              <HomeCard data={item} />
            </button>
          ))}
        </div>
        {loading && <Loading color={"#9a9cea"} type={"bubbles"} />}
        <div ref={observerRef} className="LoadMoreTrigger"></div>
      </div>
    </div>
  );
};

export default Home;
