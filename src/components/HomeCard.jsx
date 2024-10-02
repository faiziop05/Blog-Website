import React, { memo } from "react";
import "../Styles/HomeCard.css";

const HomeCard = ({ data}) => {
  return (
    <div className="HomeCardWrapper">
      <img src={data.coverImage} alt="Cover Image" />
      <h1>{data.title}</h1>
      <p>{data.category}</p>
    </div>
  );
};

export default memo(HomeCard);
