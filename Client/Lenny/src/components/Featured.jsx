import React, { useEffect, useRef, useState } from "react";
import "../style/Featured.scss";
import Button from "./Button.jsx";
import useFetch from "../hooks/useFetch";
import { baseUrl } from "../helpers";
import useRenderCount from "../hooks/useRender";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categories";
import Card from "../components/Card";
import {useNavigate} from "react-router-dom"

const Featured = ({categories}) => {
  const navigate = useNavigate()
 
  const [favProducts, setFavProducts] = useState([]);
  const [loadMore,setLoadMore]=useState(false)
  const { fetchedData } = useFetch(!loadMore ?
    `${baseUrl}/api/products?pagination[page]=1&pagination[pageSize]=4&filters[isPopular][$eq]=true&populate=*`
    : `${baseUrl}/api/products?pagination[page]=1&pagination[pageSize]=8&filters[isPopular][$eq]=true&populate=*`)
  useEffect(() => {
    if (fetchedData) {
      setFavProducts(fetchedData?.data);
    }
  }, [fetchedData]);
  return (
    <>
      <div className="featured">
        <div className="header">
          <h1>Featured Category</h1>
          <Button
            content={"View Detail"}
            ClassName={"bg-White H2"}
            width={122}
            height={45}
            textSize={"H2"}
          />
        </div>
        <div className="categories">
          {categories.map((category) => (
            <div className="featured-card" key={category.id}>
              <img
                src={`${baseUrl}${category?.attributes?.image?.data?.attributes?.url}`}
                alt=""
              />
              <h3>{category?.attributes?.name}</h3>
              <span>
                {category?.attributes?.products?.data?.length || 0} Products
              </span>
            </div>
          ))}
        </div>
        <div className="popular-products-wrapper">
          <h5>Popular Product on Lenny</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            perferendis.
          </p>
          <div className="popular-products">
          {favProducts?.map((product)=>(
            <Card
            key={product.id}
            sold={product?.attributes?.sold}
            onClick={() => {
              console.log(product);
              navigate(`/category/${product?.attributes?.categories?.data[0]?.id}/product/${product.id}`);
            }}
            imageSource={`${baseUrl}${product?.attributes?.thumbnail?.data?.attributes.url}`}
            productName={product?.attributes?.name}
            productPrice={product?.attributes?.price}
          />
          ))}
          </div>
        {!loadMore &&
        <Button ClassName={"bg-White"}
        width={180}
        height={48}
        content={"Load More"}
        onclick={()=>{
          setLoadMore(true)}}/>}
          
        </div>
      </div>
    </>
  );
};

export default Featured;
