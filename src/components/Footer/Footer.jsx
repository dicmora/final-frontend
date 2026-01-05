import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  return (
    <footer className="footer">
      {!isSavedPage && (
        <div className="footer__author">
          <div className="footer__author-image"></div>
          <div className="footer__about">
            <h3 className="footer__about-title">About the Author</h3>
            <p className="footer__author-description">
              My name is Dickson, I am a front-end developer specializing in
              responsive, user-friendly web interfaces. I work with HTML, CSS,
              JavaScript, React, and modern frameworks to build efficient,
              visually appealing applications. Through my experience at Triple
              Ten, I’ve gained hands-on experience delivering high-quality
              solutions on real-world projects and am passionate about helping
              clients achieve their goals with effective web applications.
            </p>
          </div>
        </div>
      )}

      <div className="footer__bottom">
        <div className="footer__year">
          © 2024 Supersite, Powered by News API
        </div>
        <nav className="footer__links">
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
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
