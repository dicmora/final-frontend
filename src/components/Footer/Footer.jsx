import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <footer className="footer">
      {!isProfilePage && (
        <div className="footer__author">
          <div className="footer__author-image"></div>
          <div className="footer__about">
            <h3 className="footer__about-title">About the Author</h3>
            <p className="footer__author-description">
              My name is Dickson, and I am a front-end developer specializing in
              building responsive, user-friendly web interfaces. I work with
              technologies such as HTML, CSS, JavaScript, React, and other
              modern frameworks to create visually appealing and efficient
              solutions. Through my experience with this Triple Ten, I have
              gained practical skills on real world projects and learned how to
              deliver high quality results. I am passionate about applying my
              expertise to help clients achieve their goals with effective and
              engaging web applications.
            </p>
          </div>
        </div>
      )}

      <div className="footer__bottom">
        <div className="footer__year">
          © 2024 Supersite, Powered by News API
        </div>
        <div className="footer__links">
          <div className="footer__nav-links">
            <a href="/" className="footer__link">
              Home
            </a>
            <a
              href="https://tripleten.com/"
              className="footer__link"
              target="_blank"
            >
              Triple Ten
            </a>
          </div>
          <div className="footer__icons">
            <a
              href="https://github.com/"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/github.jpg"
                alt="GitHub"
                className="footer__icon-github"
              />
            </a>

            <a
              href="https://www.linkedin.com/"
              className="footer__link"
              target="_blank"
            >
              <img
                src="/linkedin.jpg"
                alt="LinkedIn"
                className="footer__icon-linkedin"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
