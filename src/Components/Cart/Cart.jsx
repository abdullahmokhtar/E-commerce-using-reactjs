import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let timerId;

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState("");
  const [cartId, setCartId] = useState(null);

  const removeProductFromCart = async (productId) => {
    setIsLoading(true);
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          "content-type": "application/json",
          token: Cookies.get("token"),
        },
      }
    );
    setIsLoading(false);
    if (response) {
      setTotalCartPrice(response.data.data.totalCartPrice);
      setCartProducts(response.data.data.products);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    const response = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          "content-type": "application/json",
          token: Cookies.get("token"),
        },
      }
    );
    setIsLoading(false);
    console.log(response.ok);
    if (response) {
      setCartProducts([]);
      setTotalCartPrice("");
    }
  };

  const updateProductCount = async (productId, count, index) => {
    const newCartProducts = [...cartProducts];
    newCartProducts[index].count = count;
    setCartProducts(newCartProducts);

    clearTimeout(timerId);

    timerId = setTimeout(async () => {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      console.log(response);
      if (response) {
        console.log(response.data.data);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartProducts(response.data.data.products);
      }
    }, 500);
  };

  useEffect(() => {
    const getLoggedUserCart = async () => {
      setIsLoading(true);
      const response = await axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { token: Cookies.get("token") },
        })
        .catch((err) => {
          setIsLoading(false);
        });
      setIsLoading(false);
      if (response) {
        console.log(response.data.data);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartProducts(response.data.data.products);
        setCartId(response.data.data._id)
      }
    };
    getLoggedUserCart();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <i className="fas fa-spinner fa-spin fa-2x py-5 my-5"></i>
        </div>
      )}
      {cartProducts.length === 0 && !isLoading && (
        <h1 className="alert alert-warning text-center my-5">
          No Products found in your cart list add more products
        </h1>
      )}
      {!isLoading && cartProducts.length > 0 && (
        <div className="my-5">
          <button
            className="btn btn-outline-danger d-block ms-auto"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          {cartProducts.map((product, index) => (
            <div
              key={product._id}
              className="cart-product shadow rounded-2 my-3"
            >
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
                    <span className="fw-bolder">Total Price:</span>{" "}
                    {product.count * product.price} EGP
                  </p>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn bg-danger text-white mb-2 mx-2"
                    onClick={() => {
                      removeProductFromCart(product.product._id);
                    }}
                  >
                    Remove
                  </button>
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => {
                        updateProductCount(
                          product.product._id,
                          product.count - 1,
                          index
                        );
                      }}
                      className="btn bg-main text-white mx-2"
                    >
                      -
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() => {
                        updateProductCount(
                          product.product._id,
                          product.count + 1,
                          index
                        );
                      }}
                      className="btn bg-main text-white mx-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {totalCartPrice && (
            <div className="d-flex justify-content-between">
              <Link to={`/address/${cartId}`} className="btn bg-main text-white">
                CheckOut
              </Link>
              <p>Tota Cart Price: {totalCartPrice} EGP</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
