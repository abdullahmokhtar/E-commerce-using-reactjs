import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-md-3">
              <div className="product px-2 py-3">
                <img className="w-100" src={product.imageCover} alt="" />
                <h5 className="font-sm text-main">{product.category.name}</h5>
                <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <p className="d-flex justify-content-between">
                  <span className="ms-1">{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star rating-color me-1 "></i>
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

