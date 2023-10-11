import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Cart = () => {
  const [error, setError] = useState("");
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getLoggedUserCart = async () => {
      const response = await axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { token: Cookies.get("token") },
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log(err.response.data.message);
        });
      if (response) {
        setCartProducts(response.data.data.products);
      }
    };
    getLoggedUserCart();
  }, []);
  return (
    <>
      {error && (
        <h1 className="alert alert-danger text-center my-5">{error}</h1>
      )}
      {!error && (
        <div className="my-5">
          {cartProducts.map((product) => (
            <div key={product._id} className="cart-product shadow rounded-2 my-3">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt={product.product.title}
                  />
                </div>
                <div className="col-md-8">
                  <h2>{product.product.title}</h2>
                  <h5>{product.product.category.name}</h5>
                  <p className="d-flex justify-content-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color me-1"></i>{" "}
                      {product.product.ratingsAverage}
                    </span>
                  </p>
                  <p>
                    <span className="fw-bolder">Total Price:</span> {product.count * product.price}{" "}
                    EGP
                  </p>
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center">
                    <button className="btn bg-main text-white mx-2">-</button>
                    <span>{product.count}</span>
                    <button className="btn bg-main text-white mx-2">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Cart;
