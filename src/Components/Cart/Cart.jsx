import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
  const [error, setError] = useState("");
  useEffect(() => {
    const getLoggedUserCart = async () => {
      const response = await axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { token: localStorage.getItem("token") },
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log(err.response.data.message);
        });
      if (response) {
        console.log(response);
      }
    };
    getLoggedUserCart();
  }, []);
  return (
    <>
      {error && (
        <h1 className="alert alert-danger text-center my-5">{error}</h1>
      )}
    </>
  );
};

export default Cart;
