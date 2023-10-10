import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

const Home = () => {
  const [products, setProducts] = useState([]);

 

  const getAllProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data.data);
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container">
     <MainSlider />
     <CategorySlider />
      <div className="row">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
