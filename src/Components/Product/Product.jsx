import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { queryClient } from "../../util/http";
function Product({ product, fav }) {
  const { setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const addProductToWishlist = async () => {
    const response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: product.id },
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      )
      .catch((err) => {
        toast.error(err.response.data.message);
        setUserIsLoggedIn(false);
        Cookies.remove("token");
        navigate("/login");
      });
    if (response) {
      setIsFav(true);
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const removeProductFromWishlist = async () => {
    const response = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${product.id}`, {
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setUserIsLoggedIn(false);
        Cookies.remove("token");
        navigate("/login");
      });
    if (response) {
      setIsFav(false);
      toast.success(response.data.message);
      queryClient.resetQueries({ queryKey: ["wishlist"] });
    }
  };

  const addProductToCart = async () => {
    const response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: product.id },
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      )
      .catch((err) => {
        toast.error(err.response.data.message);
        setUserIsLoggedIn(false);
        Cookies.remove("token");
        navigate("/login");
      });
    if (response) {
      toast.success(response.data.message);
    }
  };
  return (
    <div className="col-md-3" role="button">
      <div className="product px-2 py-3 overflow-hidden">
        <Link
          to={`/ProductDetails/${product.id}`}
          className="text-decoration-none"
        >
          <img className="w-100" src={product.imageCover} alt={product.title} />
          <h5 className="font-sm text-main">{product.category.name}</h5>
          <h4 className="fs-5">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h4>
          <p className="d-flex justify-content-between">
            <span className="ms-1">{product.price} EGP</span>
            <span>
              {product.ratingsAverage}
              <i className="fas fa-star rating-color me-1 "></i>
            </span>
          </p>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={addProductToCart}
            className="btn bg-main text-white w-75"
          >
            + Add To Cart
          </button>
          {fav?.length > 0 || isFav ? (
            <i
              onClick={removeProductFromWishlist}
              style={{ color: "red" }}
              className="fa-solid fa-heart h3"
            ></i>
          ) : (
            <i
              onClick={addProductToWishlist}
              style={{ color: "black" }}
              className="fa-solid fa-heart h3"
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
