import { useQuery } from "react-query";
import Slider from "react-slick";
import { getCategories } from "../../util/http";
import React from "react";

const CategorySlider = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <h3 className="fw-bold my-2">Shop Popular Categories</h3>
      <Slider {...settings} className="mb-4">
        {data?.map((category, index) => (
          <React.Fragment key={index}>
            <img
              className="w-100 px-1"
              height={250}
              src={category.image}
              alt={category.name}
            />
            <h5 className="font-sm text-main">{category?.name}</h5>
          </React.Fragment>
        ))}
      </Slider>
    </>
  );
};

export default CategorySlider;
