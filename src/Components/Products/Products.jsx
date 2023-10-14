import { useQuery } from "react-query";
import { getProducts } from "../../util/http";
import { Helmet } from "react-helmet";
import Product from "../Product/Product";

const Products = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
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
        {data?.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Products;
