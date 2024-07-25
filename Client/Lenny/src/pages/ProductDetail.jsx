import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { baseUrl } from "../helpers";
import Card from "../components/Card";
import "../style/Products.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BreadCrumb from "../components/BreadCrumb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categories";
import Button from "../components/Button";
import shoppingCart from "../assets/shopping-cart.png";
import Reviews from "../components/Reviews";
import { LoopCircleLoading } from "react-loadingg";
import { Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";


const ProductDetail = () => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState([]);
  const { id, catId } = useParams();
  const { fetchedData, isLoading } = useFetch(
    `${baseUrl}/api/products/${id}?populate=*`
  );
  useEffect(() => {
    if (fetchedData) {
      setProductDetails(fetchedData.data);
    }
  }, [fetchedData]);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories()); // Dispatch the async action
  }, [dispatch]);
  const settings = {
    customPaging: function (i) {
      return (
        <div className="slider-mini-item">
          <img
            src={
              productDetails.attributes?.images?.data
                ? `${baseUrl}${productDetails.attributes?.images?.data[i]?.attributes?.url}`
                : `${baseUrl}${productDetails?.attributes?.thumbnail?.data?.attributes?.url}`
            }
          />
        </div>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { fetchedData: relatedData } = useFetch(
    `${baseUrl}/api/products?pagination[page]=1&pagination[pageSize]=4&filters[categories][id][$eq]=${catId}&filters[id][$notContains]=${id}&populate=*`
  );
  useEffect(() => {
    if (relatedData) {
      setRelatedProducts(relatedData.data);
    }
  }, [relatedData]);
  const items = [
    { label: "Blue", key: 1 },
    {
      label: "Red",
      key: 2,
    },
  ];
  return (
    <>
      <div className="container">
        <Header categories={categories} />
        {!isLoading ? (
          <div className="search-result-container">
            <BreadCrumb
              items={[
                {
                  title: <a href="/">Home</a>,
                },
                {
                  title: (
                    <a href={`/categories/${catId}`}>
                      {categories[catId - 1]?.attributes?.name}
                    </a>
                  ),
                },
                {
                  title: (
                    <a href={`/category/${catId}/product/${id}`}>
                      {productDetails?.attributes?.name}
                    </a>
                  ),
                },
              ]}
            />
            <div className="product-details-container">
              <div className="product-slider">
                <Slider {...settings}>
                  {!isLoading &&
                    (productDetails.attributes?.images?.data
                      ? productDetails?.attributes?.images?.data?.map(
                          (image) => (
                            <div key={image.id} className="slider-tank">
                              <img
                                src={`${baseUrl}${image.attributes.url}`}
                                key={image.id}
                                alt=""
                              />
                            </div>
                          )
                        )
                      : Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="slider-tank">
                            <img
                              src={`${baseUrl}${productDetails?.attributes?.thumbnail?.data?.attributes?.url}`}
                              alt=""
                            />
                          </div>
                        )))}
                </Slider>
              </div>
              <div className="product-infos">
                <h1>{productDetails.attributes?.name}</h1>
                <div className="price-info">
                  ${productDetails.attributes?.price}
                </div>
                <div className="product-desc">
                  {productDetails.attributes?.description}
                </div>
                <div className="prod-variant">
                  <h6>Product Variant:</h6>
                  <div className="type-color">
                    <div className=" prd prodType">
                      <p>Type:</p>
                      
                    </div>
                    <div className=" prd prodColor">
                      <p>Color:</p>
                    <Dropdown
                        className="dropdown-categories"
                        placement="bottom"
                        menu={{
                          items,
                          theme: "dark",
                          selectable: true,
                          onSelect: (e) => {
                            navigate(`/categories/${e.key}`);
                          },
                        }}
                        trigger={["click"]}
                      >
                        <Typography.Link>
                          <Space>
                            Blue
                            <DownOutlined />
                          </Space>
                        </Typography.Link>
                      </Dropdown></div>
                  </div>
                </div>
                <div className="add-to-cart-wrapper">
                  <Button
                    ClassName={"bg-Green"}
                    content={"Buy Now"}
                    width={260}
                    height={55}
                  />
                  <Button
                    ClassName={"bg-White"}
                    content={"Add to Chart"}
                    width={260}
                    height={55}
                    icon={<img src={shoppingCart} />}
                  />
                </div>
              </div>
            </div>
            <Reviews id={id} />
            <div className="related-products-wrapper">
              <div className="related-header">
                <h6>Related Product</h6>
                <Button
                  width={112}
                  height={38}
                  ClassName={"bg-White"}
                  content={"View Detail"}
                />
              </div>
              <div className="related-products">
                {relatedProducts?.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => {
                      navigate(`/category/${catId}/product/${product.id}`);
                    }}
                    imageSource={`${baseUrl}${product?.attributes?.thumbnail?.data?.attributes.url}`}
                    productName={product?.attributes?.name}
                    productPrice={product?.attributes?.price}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <LoopCircleLoading />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
