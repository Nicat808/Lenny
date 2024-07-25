import React, { useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal, Popover, Typography } from "antd";
import Search from "../assets/search-normal.png";
import Logo from "../assets/Logo.png";
import ShoppingIcon from "../assets/ShoppingIcon.png";
import joker from "../assets/joker.jpg";
import User from "../assets/User.png";
import { useNavigate, Link } from "react-router-dom";
import {
  baseUrl,
  setLocalStorage,
  userData,
  getLocalStorage,
} from "../helpers";
import sebet from "../assets/shopping-cart.png";
import bildirim from "../assets/notification.png";
import coin from "../assets/coin.png";
import money from "../assets/moneys.png";
import recept from "../assets/receipt-item.png";
import hearttt from "../assets/hearttt.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import useRenderCount from "../hooks/useRender";
import Button from "../components/Button";
import "../style/Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categories";
import useFetch from "../hooks/useFetch";
import { debounce } from "../helpers";

const Header = ({ categories }) => {
  useRenderCount();
  //! for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [inputFilteredItems, setInputFilteredItems] = useState([]);
  const { fetchedData } = useFetch(
    `${baseUrl}/api/products/?filters[name][$contains]=${inputValue}&populate=*`
  );
  useEffect(() => {
    if (fetchedData) {
      setInputFilteredItems(fetchedData.data);
    }
  }, [fetchedData]);
  const handleInputChange = () => {
    const newValue = inputRef.current.value;
    setInputValue(newValue);
  };
  const debouncedSearch = debounce(handleInputChange, 500);
  //! for modal
  //! searchHistory
  const [searchArray, setSearchArray] = useState(getSearchHistory() || []);
  function addToSearchHistory(searchTerm) {
    const searchHistory = getLocalStorage("searchHistory") || [];
    searchHistory.unshift(searchTerm);
    const maxHistoryLength = 10;
    const trimmedSearchHistory = searchHistory.slice(0, maxHistoryLength);
    setLocalStorage("searchHistory", trimmedSearchHistory);
  }
  function getSearchHistory() {
    return getLocalStorage("searchHistory") || [];
  }
  function clearSearchHistory() {
    setSearchArray([]);
    console.log("kaççaoo");
    localStorage.removeItem("searchHistory");
  }
  //! searchHistory
  const navigate = useNavigate();
  const { jwt } = userData();
  const logOut = () => {
    localStorage.setItem("user", "");
    navigate("/");
  };
  const items = categories.map((category) => ({
    label: category?.attributes?.name,
    key: category?.id,
  }));
  const [userCardIsOpen, setUserCardIsOpen] = useState(false);
  return (
    <>
      <header>
        <img className="logo lg-logo" src={Logo} alt="" onClick={() => navigate("/")} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addToSearchHistory(inputValue);
            setSearchArray(getSearchHistory());
            setIsModalOpen(false);
          }}
          className="input-field"
        >
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
                All categories
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
          <div className="line"></div>
          <input
            type="text"
            placeholder="Search on lenny..."
            ref={inputRef}
            onChange={debouncedSearch}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
          {isModalOpen && (
            <div
              className="inputModal"
              onClick={() => {
                console.log("CAN YOU SEE ME MOTHERFUCKERS ???");
              }}
            >
              <div className="searchResult">
                {!inputValue && (
                  <div className="lastSearchs">
                    <h3>
                      Last Searchs
                      <Button
                        content={"Clear all"}
                        ClassName={"bg-White H2"}
                        width={100}
                        height={40}
                        textSize={"H2"}
                        onclick={clearSearchHistory}
                      />
                    </h3>
                    {searchArray.map((searchTerm, index) => (
                      <div key={index} className="lastSearch">
                        {searchTerm}
                      </div>
                    ))}
                  </div>
                )}
                {inputValue && (
                  <div className="filteredItemsWrapper">
                    <h3>Related results</h3>
                    <div className="filteredItems">
                      {inputFilteredItems.map((el, i) => (
                        <div
                          onClick={() => {
                            addToSearchHistory(inputValue);
                            setSearchArray(getSearchHistory());
                            setIsModalOpen(false),
                              navigate(
                                `/category/${el.attributes.categories.data[0].id}/product/${el.id}`
                              );
                          }}
                          key={i}
                          className="input-filtered-item"
                        >
                          {el?.attributes?.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <img src={Search} className="search" alt="" />
        </form>
        <div className="user-icons">
          {jwt && <img onClick={()=>{
            navigate('/chart')}} src={sebet} alt="" />}
          {jwt && (
            <span className="productNumberCircle">
              <p className="productNumber">6</p>
            </span>
          )}
          {jwt && <img src={bildirim} alt="" />}
          <img src={ShoppingIcon} alt="" />
          <div className="line"></div>
          <div
            className="user-circle"
            onClick={() => {
              jwt ? setUserCardIsOpen(!userCardIsOpen) : navigate("/login");
            }}
          >
            <img src={jwt ? joker : User} alt="" />
          </div>
          {jwt && userCardIsOpen && (
            <div className="user-card">
              <div className="user-details user-part">
                <img className="user-details-img" src={joker} alt="" />
                <span>
                  <h2>Heath Ledger</h2>
                  Ambassador of the Chaos
                </span>
              </div>
              <div className="wallet user-part">
                <h6 className="user-part-header">Wallet</h6>
                <div className="wallet-balance">
                  <div className="balance-item">
                    <img src={money} alt="" />
                    <p>Lenny Balance</p>
                    <div className="bundle">$928,28</div>
                  </div>
                  <div className="balance-item">
                    <img src={coin} alt="" />
                    <p>Lenny Coins</p>
                    <div className="bundle">0.092</div>
                  </div>
                </div>
              </div>
              <div className="menu-items user-part">
                <h6 className="user-part-header">Menu</h6>
                <div className="menu-part">
                  <img src={recept} alt="" />
                  <p>Purchase</p>
                </div>
                <div className="menu-part">
                  <img src={hearttt} alt="" />
                  <p>Wishlist</p>
                </div>
                <div className="menu-part">
                  <img src={settings} alt="" />
                  <p>Settings</p>
                </div>
              </div>
              <div className="sign-out" onClick={logOut}>
                <img src={logout} alt="" />
                <p>Sign Out</p>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
