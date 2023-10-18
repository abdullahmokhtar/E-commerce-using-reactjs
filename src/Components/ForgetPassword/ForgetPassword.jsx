import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
  });

  const forgetPassword = async () => {
    setIsLoading(true);
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        formik.values
      )
      .catch((err) => {
        setIsLoading(false);
      });
    setIsLoading(false);
    if (data.statusMsg === "success") {
      navigate("/verify-code");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });
  return (
    <div className="w-75 m-auto my-5">
      <h1>Reseting Password:</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="my-1">
          Email:
        </label>

        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          name="email"
          id="email"
          className="form-control mb-3"
        />
        {!isLoading ? (
          <button
            disabled={!formik.isValid}
            type="submit"
            className="btn bg-main text-white px-3 ms-auto d-block"
          >
            Verify
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="btn bg-main text-white px-3 ms-auto d-block"
          >
            <i className="fas fa-spin fa-spinner"> </i>
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
