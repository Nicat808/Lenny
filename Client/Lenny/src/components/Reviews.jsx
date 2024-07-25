import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews } from "../redux/actions/review";
import "../style/Reviewsss.scss";
import { Rate } from "antd";
import Button from "../components/Button";
import { baseUrl, userData } from "../helpers";
import NewReview from "../components/NewReview";
import { deleteReview } from "../redux/reducers/reviewsReducer";
import axios from "axios";
import privateInstance from "../api";
const Reviews = ({ id }) => {
  const navigate=useNavigate()
  const { jwt, user } = userData();
  const { data: reviewsDetails } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);
  const handleDelete = async (id) => {
    try {
      await privateInstance.delete(`/api/reviews/${id}`);
      //   `${baseUrl}/api/reviews/${id}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${jwt}`,
      //     },
      //   }
      // );
      dispatch(deleteReview(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="reviews-wrapper">
        { reviewsDetails.length ? reviewsDetails?.map((item) => (
          <div key={item.id} className="review">
            <Rate
              className="rate"
              defaultValue={item?.attributes?.star}
              disabled
            />
            <p>{item.attributes?.text}</p>
            <b>{item.attributes?.createdAt}</b>
            <h6>{item.attributes?.username}</h6>
            {item.attributes?.username === user?.username && (
              <Button
                onclick={() => {
                  handleDelete(item.id);
                }}
                content={"Delete"}
                width={60}
                height={40}
                ClassName={"bg-Green"}
              />
            )}
          </div>
        )) : <p className="isNotPreview">There is not any review yet,be first !</p>}
        {jwt ? (
          <NewReview id={id} />
        ) : (
          <Button
            width={260}
            height={55}
            content={"Sign up for write review"}
            onclick={()=>navigate("/register")}
            ClassName={"bg-Green sign-up-for-review"}
          />
        )}
      </div>
    </>
  );
};

export default Reviews;
