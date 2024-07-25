import React, { Fragment, useState } from "react";
import "../style/NewReview.scss";
import { Rate } from "antd";
import Button from "../components/Button";
import { useRef } from "react";
import { baseUrl, userData } from "../helpers";
import privateInstance from "../api";
import axios from "axios";
import { addReview } from "../redux/reducers/reviewsReducer";
import { useDispatch } from "react-redux";
const NewReview = ({ id }) => {
  const [star, setStar] = useState(0);
  const [text, setText] = useState("");
  const textRef = useRef(null);
  const { user, jwt } = userData();
  const dispatch = useDispatch()
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      star,
      productID: id,
      username: user.username,
      text,
    };
    console.log(data);
    newReview(data);
    setText("");
    setStar(0);
  };
  const newReview = async (data) => {
    try {
      const res = await privateInstance.post(`/api/reviews/`,{data})
      dispatch(addReview(res.data.data))
    } 
    catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="new-review" onSubmit={handleFormSubmit}>
        <Rate value={star} onChange={setStar} />
        <input
          ref={textRef}
          onChange={() => {
            const value = textRef.current.value;
            setText(value);
          }}
          value={text}
          placeholder="Write a review..."
          type="text"
        />
        <Button
          content={"Send"}
          ClassName={"bg-Green"}
          width={120}
          height={40}
        />
      </form>
    </>
  );
};

export default NewReview;
