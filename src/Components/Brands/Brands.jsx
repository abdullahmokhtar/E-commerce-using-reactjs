import { useQuery } from "react-query";
import { getBrands } from "../../util/http";
import { Helmet } from "react-helmet";

const Brands = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="container mb-5">
        <h1 className="text-main text-center fw-bolder my-4">All Brands</h1>
        {isLoading && (
          <div className="text-center">
            <i className="fas fa-spinner fa-spin fa-2x py-5 my-5"></i>
          </div>
        )}
        {!isLoading && (
          <div className="row g-4">
            {data?.map((brand) => (
              <div key={brand._id} className="col-md-3">
                <div className="card">
                  <div className="card-img">
                    <img className="w-100" src={brand.image} alt={brand.name} />
                  </div>
                  <div className="card-body">
                    <p className="text-center">{brand.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Brands;
