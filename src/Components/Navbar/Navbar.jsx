import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUserIsLoggedIn(false);
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userIsLoggedIn && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wishList" className="nav-link">
                  Wish List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/brands" className="nav-link">
                  Brands
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className="fa-brands mx-2 fa-facebook"></i>
              <i className="fa-brands mx-2 fa-twitter"></i>
              <i className="fa-brands mx-2 fa-instagram"></i>
              <i className="fa-brands mx-2 fa-youtube"></i>
              <i className="fa-brands fa-tiktok mx-2"></i>
            </li>
            {!userIsLoggedIn && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            {!userIsLoggedIn && (
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            )}
            {userIsLoggedIn && (
              <li className="nav-item">
                <span onClick={logout} className="nav-link" role="button">
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
