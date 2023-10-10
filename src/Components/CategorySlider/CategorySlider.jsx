import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getAllCategory = async () => {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    };
    getAllCategory();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };
  return (
    <Slider {...settings} className="mb-4">
      {categories?.map((category, index) => (
        <>
          <img
          className="w-100 px-1"
            key={index}
            height={200}
            src={category.image}
            alt={category.name}
          />
          <h5 className="ps-2 font-sm text-main">{category?.name}</h5>
        </>
      ))}
      {/* <img className="w-100" height={500} src={slide1} alt="slide" />
        <img className="w-100" height={500} src={slide2} alt="slide" /> */}
    </Slider>
  );
};

export default CategorySlider;
