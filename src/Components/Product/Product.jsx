import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
function Product({ product }) {
  const addProductToCart = async () => {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: product.id },
      {
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      }
    );
    console.log(data);
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
          <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
          <p className="d-flex justify-content-between">
            <span className="ms-1">{product.price} EGP</span>
            <span>
              {product.ratingsAverage}
              <i className="fas fa-star rating-color me-1 "></i>
            </span>
          </p>
        </Link>
        <button onClick={addProductToCart} className="btn bg-main text-white w-100">+ Add To Cart</button>
      </div>
    </div>
  );
}

export default Product;
