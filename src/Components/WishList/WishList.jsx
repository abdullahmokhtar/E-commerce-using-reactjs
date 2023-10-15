import { Helmet } from "react-helmet";
import {
  deleteProductFromWishList,
  getLoggedUserWishList,
  queryClient,
} from "../../util/http";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getLoggedUserWishList,
  });

  const { mutate: deleteProduct, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: deleteProductFromWishList,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["wishlist"] });
    },
  });

  const addProductToCart = async (productId) => {
    const response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
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
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>

      {!isLoading &&
        data?.map((product) => (
          <div key={product._id} className="cart-product shadow rounded-2 my-3">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img
                  className="w-100"
                  src={product.imageCover}
                  alt={product.title}
                />
              </div>
              <div className="col-md-7">
                <h2>{product.title}</h2>
                <h5>{product.category.name}</h5>
                <p className="d-flex justify-content-between">
                  <span className="text-main">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color me-1"></i>
                    {product.ratingsAverage}
                  </span>
                </p>
              </div>
              <div className="col-md-3">
                <button
                  onClick={() => {
                    deleteProduct({ id: product._id });
                  }}
                  className="btn bg-danger text-white w-75 mb-2 mx-2"
                >
                  Remove
                </button>
                <button onClick={()=>{ addProductToCart(product._id)}} className="btn bg-success text-white w-75 mb-2 mx-2">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default WishList;
