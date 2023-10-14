import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { getCategories } from "../../util/http";

const Categories = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="contaianer my-5 py-5">
        <div className="row g-4">
          {data?.map((category) => (
            <div key={category._id} className="col-md-4">
              <div className="card">
                <div className="card-img">
                  <img
                    height={300}
                    className="w-100"
                    src={category.image}
                    alt={category.name}
                  />
                </div>
                <div className="card-body">
                  <p className="text-success h3 text-center">{category.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="contaianer">
        
      </div>
    </>
  );
};

export default Categories;
