import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { getProducts } from "../../util/http";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const addProductToCart = async () => {
    const response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProducts({ id }),
  });

  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
      </Helmet>
      {isError && (
        <div className="alert alert-warning text-center my-5">
          <p className="text-danger">
            An error occurred while fetching the products Details
          </p>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-4">
              <Slider {...settings}>
                {data?.images?.map((img, index) => (
                  <img
                    loading="lazy"
                    key={index}
                    className="w-100"
                    src={img}
                    alt={data?.title}
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h2 className="mb-1 fw-bold">{data?.title}</h2>
              <h5 className="font-sm text-main mt-2">{data?.category?.name}</h5>
              <p className="mt-2">{data?.description}</p>
              <p className="d-flex justify-content-between mt-2">
                <span>{data?.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color me-1"></i>
                  <span> {data?.ratingsAverage}</span>
                </span>
              </p>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  onClick={addProductToCart}
                  className="btn bg-main text-white w-75 mx-auto"
                >
                  + Add To Cart
                </button>
                <i className="fa-solid fa-heart h3" role="button"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="d-flex align-items-center my-5 py-5 justify-content-center">
          <i className="fas fa-spin fa-spinner fa-2x"></i>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
