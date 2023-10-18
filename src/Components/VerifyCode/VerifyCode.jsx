import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const VerifyCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const verifyCode = async () => {
    setIsLoading(true);
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        formik.values
      )
      .catch((err) => {
        setIsLoading(false);
      });
    setIsLoading(false);
    if (data.status === "Success") {
      navigate("/reset-password");
    }
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("resetCode is required")
      .min(4, "resetCode is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  });
  return (
    <>
    <Helmet>
      <title>Verify Code</title>
    </Helmet>
      <div className="w-75 m-auto my-5">
        <h1>Reset your account password:</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="resetCode" className="my-1">
            Code:
          </label>

          <input
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            type="text"
            name="resetCode"
            id="resetCode"
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
    </>
  );
};

export default VerifyCode;
