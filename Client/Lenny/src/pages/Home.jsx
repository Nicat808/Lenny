import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/Slider"
import Featured from "../components/Featured";
import Ipod from "../assets/iPad-Air-2020.png" 
import Article from "../components/Article";
import  Button  from "../components/Button";
import "../style/Index.scss"
import axios from "axios";
import { baseUrl } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categories";

const Home = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories()); // Dispatch the async action
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <Header categories={categories}/>
        </div>
        <div className="container slider-container">
        <Slider/>
        </div>
        <div className="container">
        <Featured categories={categories} />
        <div className="advertisement-wrapper">
          <img src={Ipod} alt="" />
          <div className="advertisement-details">
            <h3>Ipad Air Gen 5</h3>
            <span>Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in sapien quam risus sed diam.</span>
            <div className="buttons">
              <Button width={200} height={53} 
              content={"Buy $900"}
              ClassName={"bg-Green"}/>
              <Button width={200} height={53} 
              content={"View Detail"}
              ClassName={"bg-White"}/>
            </div>
          </div>
        </div>
        <Article/>
        </div>
        <Footer/>
    </>
  );
};

export default Home;
