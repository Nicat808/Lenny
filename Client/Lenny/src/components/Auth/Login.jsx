import React, { useState } from "react";
import eye from "../../assets/eye.png";
import eyeslash from "../../assets/eye-slash.png";
import facebook from "../../assets/Facebook.png";
import Button from "../../components/Button";
import axios from 'axios'; 
import "../../style/Auth.scss";
import {  useNavigate } from "react-router-dom";
import { baseUrl } from "../../helpers";
import { storeUser } from "../../helpers";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initialUser = {
    identifier: "",
    password: "",
  };
  const [user, setUser] = useState(initialUser);
  const handleInputChange = ({target})=>{
    const {name,value} = target;
    setUser((currentUser)=>({
      ...currentUser,[name]:value,
    }));
  }

  const signIn = async () =>{
    try {
      const url = `${baseUrl}/api/auth/local`;
      if (user.identifier && user.password ) {
        const {data} = await axios.post(url,user);
        if (data.jwt) {
          storeUser(data)
          navigate("/")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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
              signIn()
            }}
          >
            <h3>Sign In</h3>
         
            <div className="field">
              <label htmlFor="">Phone Number or Email</label>
              <input
                name="identifier"
                value={user.identifier}
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
            
            <span className="sign-in" >Don't have an account ? <p onClick={()=>navigate("/register")}>Sign up</p> </span>
            <span onClick={() => navigate("/")} className="trouble">
              Getting Trouble ?
            </span>
            <Button
              width={392}
              height={48}
              content={"Sign In"}
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

export default Login;
