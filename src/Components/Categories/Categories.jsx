import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { getCategories } from "../../util/http";
import axios from "axios";
import { useState } from "react";

const Categories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const getSubCategory = async (id, name) => {
    setIsLoading(true);
    setCategoryName(name);
    setSubCategories([]);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    setIsLoading(false);
    if (data.data.length > 0) {
      setSubCategories(data.data);
    }
  };
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="contaianer my-5 py-5">
        <div className="row g-4">
          {data?.map((category) => (
            <div key={category._id} className="col-md-4">
              <div
                onClick={() => getSubCategory(category._id, category.name)}
                className="card"
                role="button"
              >
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
      {isLoading && (
        <div className="text-center">
          <i className="fas fa-spinner fa-spin fa-2x py-5 my-5"></i>
        </div>
      )}
      {!isLoading && (
        <div className="contaianer mb-3">
          {categoryName && (
            <h2 className="text-center text-main my-4 fs-2 fw-bold">
              {categoryName} subcategories
            </h2>
          )}
          {subCategories && (
            <div className="row gy-3">
              {subCategories.map((subCategory) => (
                <div className="col-md-4">
                  <div className="card">
                    <p className="h3 text-center p-3 fw-bold">
                      {subCategory.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Categories;
