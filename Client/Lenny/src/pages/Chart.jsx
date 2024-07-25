import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categories";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import { baseUrl } from "../helpers";
import Button from "../components/Button";
import Card from "../components/Card";
import "../style/Chart.scss";
import { Checkbox } from "antd";
import Trash from "../assets/trash.png";

const Chart = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories()); // Dispatch the async action
  }, [dispatch]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedProducts,setSelectedProducts]=useState([])
  console.log(selectedProducts);
  const { fetchedData: relatedData } = useFetch(
    `${baseUrl}/api/products?pagination[page]=1&pagination[pageSize]=4&filters[categories][id][$eq]=1&filters[id][$notContains]=1&populate=*`
  );
  useEffect(() => {
    if (relatedData) {
      setRelatedProducts(relatedData.data);
    }
  }, [relatedData]);
  const chartProducts = [];
  return (
    <>
      <div className="container">
        <Header categories={categories} />
        <div className="shop-chart">
          <h4>Shopping Chart</h4>
          <span>Showing your choices product</span>
          <div className="chart-details-wrapper">
            <div className="chart-items">
              {relatedProducts.map((product) => (  
                <div key={product.id} className="chart-item">
                  <input id="checkbox" type="checkbox" onChange={(e)=>{
                    if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product]);
                    } else {
                        setSelectedProducts(selectedProducts.filter(selectedProduct => selectedProduct !== product));
                    }
                  }} />
                  <div className="chrt-img-wrpr">
                    <img
                      className="chrt-img"
                      src={`${baseUrl}${product?.attributes?.thumbnail?.data?.attributes.url}`}
                      alt=""
                    />
                  </div>
                  <div className="chart-item-details">
                    <h4>{product?.attributes?.name}</h4>
                    <div>${product?.attributes?.price}</div>
                  </div>
                  <img id="trash-icon" src={Trash} alt="" />
                </div>
              ))}
            </div>
            <div className="product-summary">
              <h4>Product Summary</h4>
              <div className="chartt-products">
                {selectedProducts.length ? <div id="chart-prod-name-price">
                {selectedProducts.map((product) => (
                <div key={product.id} className="chart-prod-res-item">
                  <p>{product?.attributes?.name}</p>
                  <div>${product?.attributes?.price}</div>
                </div>
              ))}
                </div>: <p id="noProd">No product selected</p>}
              </div>
              <div id="total-prices">
                <div className="total-price">
                  Total Price
                  <div>
                    $
                    {selectedProducts.reduce((accumulator, product) => {
                      return accumulator + product?.attributes?.price;
                    }, 0)}
                  </div>
                </div>
                <div className="total-price">
                  Total Price (discount) <div>$0</div>
                </div>
                <div className="total-price">
                  Tax & Fee <div>$0</div>
                </div>
              </div>
              <div className="last-chart-result">
                <h1>Total Price</h1>
                <div>
                  $
                  {selectedProducts.reduce((accumulator, product) => {
                    return accumulator + product?.attributes?.price;
                  }, 0)}
                </div>
              </div>
              <Button
                width={332}
                height={48}
                ClassName={"bg-Green"}
                content={"Checkout"}
              />
            </div>
          </div>
        </div>
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
      <Footer />
    </>
  );
};

export default Chart;
