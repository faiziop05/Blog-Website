import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import NAvBar from "../../components/NAvBar";
import axios from "axios";
import HomeCard from "../../components/HomeCard";
import "../../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
const CategoryScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState("");
  const fetchData = async () => {
    try {
        setLoading(true)
      const res = await axios.post(
        `http://localhost:5000/api/user/getBlogsByCategory`,
        { category: selectedTags }
      );
      if (res.status === 200) {
        setData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTags != "") {
      fetchData();
    }
  }, [selectedTags]);

  const handleCategoryChange = (e) => {
    setData([]);
    setSelectedTags(e.target.value);
  };

  return (
    <div>
      <NAvBar disableScreen={false} />
      <div className="HomeScreenContainer">
        <h2>Blogs by Category</h2>
        <div className="selected-tags-containercategoryscreen">
          <label htmlFor="tagscategoryscreen">Select Category</label>
          <select
            id="tags"
            value={selectedTags}
            onChange={(e) => handleCategoryChange(e)}
            className="tags-select-categoryscreen"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
        <div className="HomeCardsContainer">
          {data?.map((item) => (
            <button
              onClick={() => navigate("/BlogReadScreen", { state: item })}
              className="HomeCardButton"
              key={item.id}
            >
              <HomeCard data={item} />
            </button>
          ))}
        </div>

        {loading  && (
          <Loading color={"#9a9cea"} type={"bubbles"} />
        )}
      </div>
    </div>
  );
};

export default memo(CategoryScreen);
