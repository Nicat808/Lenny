import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useRef, useState } from "react";
import { baseUrl, debounce } from "../helpers";
import { ConfigProvider, Pagination, Collapse, Select } from "antd";
import useFetch from "../hooks/useFetch";
import useRenderCount from "../hooks/useRender";
import Card from "../components/Card";
import "../style/Products.scss";
import "../style/Pagination.scss";
import "../style/Index.scss";
import BreadCrumb from "../components/BreadCrumb";
import { getCategories } from "../redux/actions/categories";
import { useDispatch, useSelector } from "react-redux";
import { LoopCircleLoading } from "react-loadingg";

const Products = () => {
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const handleMinInputChange = () => {
    const minPrice = minRef.current.value;
    if (!isNaN(minPrice)) {
      setParams("minPrice", minPrice);
    }
  };
  const handleMaxInputChange = () => {
    const maxPrice = maxRef.current.value;
    if (!isNaN(maxPrice)) {
      setParams("maxPrice", maxPrice);
    }
  };
  const debouncedMinSearch = debounce(handleMinInputChange, 1000);
  const debouncedMaxSearch = debounce(handleMaxInputChange, 1000);

  //! for setting url
  const [pageSize, setPageSize] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();
  const setParams = (name, value) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const catId = useParams().id;
  //! For Products
  const { fetchedData, isLoading } = useFetch(
    `${baseUrl}/api/products?pagination[page]=${
      searchParams.get("page") || 1
    }&pagination[pageSize]=${pageSize}&sort[0]=price:${
      searchParams.get("sort") || "asc"
    }&filters[categories][id][$eq]=${catId}&${
      searchParams.get("minPrice")
        ? `filters[price][$gt]=${searchParams.get("minPrice")}`
        : ""
    }&${
      searchParams.get("maxPrice")
        ? `filters[price][$lt]=${searchParams.get("maxPrice")}`
        : ""
    }&populate=*`
  );

  useEffect(() => {
    if (fetchedData) {
      setProducts(fetchedData);
    }
  }, [fetchedData]);
  //!
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories()); // Dispatch the async action
  }, [dispatch]);

  const items = [
    {
      key: "2",
      label: "Price Range",
      children: (
        <form className="sort-form">
          <div key={1} className="sort-price-item">
            <Select
              defaultValue={"USD"}
              options={[
                {
                  value: "USD",
                  label: "USD",
                },
              ]}
            />

            <input
              ref={minRef}
              onChange={debouncedMinSearch}
              placeholder="Minimum price"
              className="min-price-input"
              type="text"
            />
          </div>
          <div key={2} className="sort-price-item">
            <Select
              defaultValue={"USD"}
              options={[
                {
                  value: "USD",
                  label: "USD",
                },
              ]}
            />

            <input
              ref={maxRef}
              onChange={debouncedMaxSearch}
              placeholder="Maximum price"
              className="max-price-input"
              type="text"
            />
          </div>
          <div
            onClick={() => {
              setParams("minPrice", 0);
              setParams("maxPrice", 200);
            }}
            className="staticSort"
          >
            0$-200$
          </div>
          <div
            onClick={() => {
              setParams("minPrice", 200);
              setParams("maxPrice", 500);
            }}
            className="staticSort"
          >
            200$-500$
          </div>
          <div
            onClick={() => {
              setParams("minPrice", 500);
              setParams("maxPrice", 1000);
            }}
            className="staticSort"
          >
            500$-1000$
          </div>
        </form>
      ),
    },
  ];

  return (
    <>
      <div className="container">
        <Header categories={categories} />
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
              ]}
            />
            <div className="filter-options-header">
              <div className="options-left">
                <h1>
                  Showing product for "{categories[catId - 1]?.attributes?.name}
                  "
                </h1>
                <div>
                  Showing 1-{products?.meta?.pagination?.total} Products
                </div>
              </div>
              <div className="options-right">
                <p>Sort by :</p>
                <Select
                  size="middle"
                  defaultValue={searchParams.get("sort") || "asc"}
                  className="sort-select"
                  onChange={(sort) => {
                    setParams("sort", sort);
                  }}
                  options={[
                    {
                      value: "asc",
                      label: "Ascending Prices",
                    },
                    {
                      value: "desc",
                      label: "Descending Prices",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="filter-options-and-products">
              <div className="filter-options">
                <h4>Filter options</h4>
                <Collapse
                  expandIconPosition={"end"}
                  bordered={false}
                  items={items}
                  defaultActiveKey={["1"]}
                />
              </div>
              <div className="filter-results">
                <div className="products-Wrapper">
                  {products?.data?.map((product) => (
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
                {!isLoading && (
                  <ConfigProvider
                    theme={{
                      components: {
                        Pagination: {
                          itemSizeSM: "44",
                        },
                      },
                    }}
                  >
                    <Pagination
                      className="pagination"
                      defaultCurrent={searchParams.get("page") || 1}
                      total={products?.meta?.pagination?.total}
                      defaultPageSize={pageSize}
                      onChange={(page) => {
                        window.scrollTo(0, 0);
                        setParams("page", page);
                      }}
                    />
                  </ConfigProvider>
                )}
              </div>
            </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
