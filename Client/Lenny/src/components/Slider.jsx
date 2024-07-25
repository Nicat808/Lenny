import React from "react";
import { useState, useRef } from 'react';
import { Carousel } from 'antd';
import SliderImage from "../assets/SliderImage.png";
import Button from "../components/Button";
import "../style/Slider.scss";
import NEXT from "../assets/arrow-right.svg"

const Slider = () => {
  const carouselRef = useRef(null); // Create a ref for the Carousel component

  const handleNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next(); // Call the next() function on the ref
    }
  };
  return (
    <Carousel autoplay ref={carouselRef} dots={false}>
      <div className="slide">
        <img src={SliderImage} alt="" className="SliderImage" />
        <h1>upgrade your wardrobe with our collection</h1>
        <span>
          Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque
          lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est
          ullamcorper nisl amet non mollis.
        </span>
        <div className="buttons">
          <Button width={180} 
          height={50} 
          content={"Buy Now"}
          ClassName={"bg-Green"}/>
          <Button width={180} 
          height={50} 
          content={"View Detail"}
          ClassName={"bg-White"}/>
        </div>
        <div className="nxt" onClick={handleNextSlide}>
        <img src={NEXT} className="next-btn" alt="" />
        </div>
   </div>
   <div className="slide">
        <img src={SliderImage} alt="" className="SliderImage" />
        <h1>upgrade your wardrobe with our collection</h1>
        <span>
          Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque
          lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est
          ullamcorper nisl amet non mollis.
        </span>
        <div className="buttons">
          <Button width={180} 
          height={50} 
          content={"Buy Now"}
          ClassName={"bg-Green"}/>
          <Button width={180} 
          height={50} 
          content={"View Detail"}
          ClassName={"bg-White"}/>
        </div>
        <div className="nxt" onClick={handleNextSlide}>
        <img src={NEXT} className="next-btn" alt="" />
        </div>
   </div>
   <div className="slide">
        <img src={SliderImage} alt="" className="SliderImage" />
        <h1>upgrade your wardrobe with our collection</h1>
        <span>
          Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque
          lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est
          ullamcorper nisl amet non mollis.
        </span>
        <div className="buttons">
          <Button width={180} 
          height={50} 
          content={"Buy Now"}
          ClassName={"bg-Green"}/>
          <Button width={180} 
          height={50} 
          content={"View Detail"}
          ClassName={"bg-White"}/>
        </div>
        <div className="nxt" onClick={handleNextSlide}>
        <img src={NEXT} className="next-btn" alt="" />
        </div>
   </div>
   <div className="slide">
        <img src={SliderImage} alt="" className="SliderImage" />
        <h1>upgrade your wardrobe with our collection</h1>
        <span>
          Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque
          lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est
          ullamcorper nisl amet non mollis.
        </span>
        <div className="buttons">
          <Button width={180} 
          height={50} 
          content={"Buy Now"}
          ClassName={"bg-Green"}/>
          <Button width={180} 
          height={50} 
          content={"View Detail"}
          ClassName={"bg-White"}/>
        </div>
        <div className="nxt" onClick={handleNextSlide}>
        <img src={NEXT} className="next-btn" alt="" />
        </div>
   </div>
   
     
  </Carousel>
  );
};

export default Slider;
