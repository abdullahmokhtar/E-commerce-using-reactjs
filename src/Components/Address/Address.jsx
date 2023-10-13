import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React from "react";
import { useParams } from "react-router-dom";

const Address = () => {
  const { cartId } = useParams();

  const order = async (shippingAddress) => {
    console.log(Cookies.get("token"));
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      { shippingAddress },
      {
        headers: { token: Cookies.get("token") },
      }
    );
    // console.log(response);
    window.location.href = response.data.session.url;
  };
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: order,
  });
  return (
    <form className="w-75 m-auto my-3" onSubmit={formik.handleSubmit}>
      <label htmlFor="details" className="my-1">
        Details:
      </label>
      <input
        value={formik.values.details}
        onChange={formik.handleChange}
        name="details"
        id="details"
        type="text"
        className="form-control mb-3"
      />

      <label htmlFor="phone" className="my-1">
        Phone:
      </label>
      <input
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        onChange={formik.handleChange}
        name="phone"
        id="phone"
        type="tel"
        className="form-control mb-3"
      />

      <label htmlFor="city" className="my-1">
        City:
      </label>
      <input
        onBlur={formik.handleBlur}
        value={formik.values.city}
        onChange={formik.handleChange}
        name="city"
        id="city"
        type="text"
        className="form-control mb-3"
      />

      <button
        type="submit"
        className="btn bg-main text-white px-3 ms-auto d-block"
      >
        Order
      </button>
    </form>
  );
};

export default Address;
