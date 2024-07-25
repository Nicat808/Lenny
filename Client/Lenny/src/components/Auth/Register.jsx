import React, { useState } from "react";
import eye from "../../assets/eye.png";
import eyeslash from "../../assets/eye-slash.png";
import facebook from "../../assets/Facebook.png";
import Button from "../../components/Button";
import axios from "axios";
import "../../style/Auth.scss";
import {  useNavigate } from "react-router-dom";
import { baseUrl } from "../../helpers";
import { useForm } from "react-hook-form";


const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initialUser = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUser);
  const handleInputChange = ({target})=>{
    const {name,value} = target;
    setUser((currentUser)=>({
      ...currentUser,[name]:value,
    }));
  }
  const signUp = async () => {
    try {
      const url = `${baseUrl}/api/auth/local/register`;
      if (user.email && user.password && user.username) {
        const res = await axios.post(url, user);
        if (!!res) {
          navigate("/login");
        }
      }
    } catch (error) {
console.log(error);    }
  };

  return (
    <div>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
      >
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            <h3>Sign Up</h3>
            <div className="field">
              <label htmlFor="">Name</label>
              <input
                name="username"
                type="text"
                placeholder="Enter your name"
                value={user.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor=""> or Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Enter your phone number or email"
              />
            </div>
            <div className="field eye-container">
              <label htmlFor="">Password</label>
              <input
                name="password"
                value={user.password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleInputChange}
              />
              <img
                className="input-eye"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                src={showPassword ? eyeslash : eye}
                alt=""
              />
            </div>
            {/* {res.name==="AxiosError" && (<p>{res}</p>)} */}
            <span className="sign-in">
              Do you have an account ?{" "}
              <p onClick={() => navigate("/login")}>Sign in</p>{" "}
            </span>

            <span onClick={() => navigate("/")} className="trouble">
              Getting Trouble ?
            </span>
            <Button
              width={392}
              height={48}
              content={"Sign Up"}
              ClassName={"bg-Green"}
            />
            <div className="another-method">
              <div className="lineee"></div>
              <span>Or using other method</span>
            </div>
            <Button
              width={392}
              height={48}
              content={"Sign Up with Facebook"}
              ClassName={"bg-White"}
              icon={<img src={facebook} />}
              borderColor={"#E4E9EE"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
