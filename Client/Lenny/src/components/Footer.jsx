import React from "react";
import Logo from "../assets/Logo.png";
import "../style/Footer.scss";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="about-side">
          <div className="left-side">
            <img className="logo" src={Logo} alt="" />
            <p>
              The biggest marketplace managed by Ideologist corp, which provides
              various kinds of daily needs and hobbies.
            </p>
          </div>
          <div className="right-side">
            <div className="about-child">
              <h1>About Lenny</h1>
              <span>Information</span>
              <span>Store Lactor</span>
              <span>Bulk Purchase</span>
              <span>Alteration Services</span>
              <span>Gift Delivery Service</span>
              <span>Live Station</span>
            </div>
            <div className="about-child">
              <h1>About Lenny</h1>
              <span>FAQ</span>
              <span>Return Policy</span>
              <span>Privacy Pollcy</span>
              <span>Accessibility</span>
              <span>Contact Us</span>
            </div>
            <div className="about-child">
              <h1>Account</h1>
              <span>Membership</span>
              <span>Address</span>
              <span>Cupons</span>
            </div>
            <div className="about-child">
              <h1>Contact Us</h1>
              <span>For Lenny Consumer Complaint Services</span>
              <span>(684) 555-0102 and curtis.weaver@example.com</span>
              <span>Customers Complaint Service</span>
              <span>Directorate Generate of the Republic of Indonesia</span>
              <span>(480) 555-0103</span>
            </div>
          </div>
        </div>
        <div className="copyright-side">
          <span>COPYRIGHT © LENNY CO., LTD. ALL RIGHTS RESERVED.</span>
          <p>
            <span>Terms of use</span>
            <span>Privacy Policy</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
