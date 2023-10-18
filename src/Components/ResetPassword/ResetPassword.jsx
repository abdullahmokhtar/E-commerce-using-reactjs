import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as Yup from "yup";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUserIsLoggedIn } = useContext(AuthContext);

  const updatePassword = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const { data } = await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formik.values
      )
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
    setIsLoading(false);
    if (data) {
      setUserIsLoggedIn(true);
      Cookies.set("token", data.token, { expires: 2 });
      navigate("/home", { replace: true });
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password must contain a special character, number and greater than 8 characters and less than 18 characters"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: updatePassword,
  });
  return (
    <div className="w-75 m-auto my-5">
      <h1>Reset Password Now:</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="my-1">
          Email:
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          name="email"
          id="email"
          className="form-control mb-3"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="alert alert-danger">{formik.errors.email}</div>
        )}

        <label htmlFor="newPassword" className="my-1">
          New Password:
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          type="password"
          name="newPassword"
          id="newPassword"
          className="form-control mb-3"
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="alert alert-danger">{formik.errors.newPassword}</div>
        )}

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {!isLoading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white px-3 ms-auto d-block"
          >
            Reset Password
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

export default ResetPassword;
