import axios from "axios";
import Product from "../Product/Product";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { useQuery } from "react-query";

const Home = () => {
  async function getAllProducts() {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    if (response.status === null) {
      const error = new Error("An error occurred while fetching the products");
      error.code = response.status;
      throw error;
    }
    const { data } = response;

    return data;
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <>
      <MainSlider />
      <CategorySlider />
      {isError && (
        <div className="alert alert-warning text-center">
          <p className="text-danger">
            An error occurred while fetching the products
          </p>
        </div>
      )}
      {isLoading && (
        <div className="text-center">
          <i className="fas fa-spinner fa-spin fa-2x "></i>
        </div>
      )}
      <div className="row">
        {data?.data.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Home;
