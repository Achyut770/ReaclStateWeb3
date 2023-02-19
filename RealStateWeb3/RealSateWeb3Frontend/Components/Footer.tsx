import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/footer.css";

function Footer() {
  return (
    <>
      <footer className="footer_Container">
        <div className="ContainerOne">
          <div>
            <span className="logo_Big">Realty</span>{" "}
            <span className="logo_Small">Logo</span>
          </div>
          <div>
            Artificial intelligence (AI) and machine learning algorithms that
            can provide personalized recommendations or help users find
            properties that match their specific needs and preferences
          </div>
        </div>

        <div className="ContainerTwo">
          <div>Quick Links</div>
          <ul>
            <li>
              <NavLink className="footer_NavLink" to="/">
                Home{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="footer_NavLink" to="/buy">
                Buy{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="footer_NavLink" to="/sell">
                Sell{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="footer_NavLink" to="/history">
                History{" "}
              </NavLink>
            </li>
            <li>
              <NavLink className="footer_NavLink" to="/bookmark">
                Bookmark{" "}
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="ContainerThree">
          <div className="bigFooter">Social Medias</div>
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer nofollow">
                <i className=" fa-2x fa-brands fa-square-facebook"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.instagram.com/achyut_7777/">
                <i className=" fa-2x fa-brands fa-square-instagram"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://twitter.com/AchyutA46243914">
                <i className=" fa-2x fa-brands fa-square-twitter"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://github.com/Achyut770">
                <i className=" fa-2x fa-brands fa-square-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
