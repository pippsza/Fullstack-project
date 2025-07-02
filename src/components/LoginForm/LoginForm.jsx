import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Svg from "../Svg/svg.jsx";

import { login } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .min(3, "Must be min 3 chars")
    .required("This field is required")
    .max(50, "Must be less then 50 chars"),
  password: Yup.string()
    .min(8, "Must be min 8 chars")
    .required("This field is required")
    .max(50, "Must be less then 50 chars"),
});

const initialValues = { email: "", password: "" };

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const isLogged = useSelector(selectIsLoggedIn);
  console.log(isLogged, "islogged?");
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
      })
      .catch(() => {
        toast.error(
          "Failed to log in. Please check your email or password and try again."
        );
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
        <Form className={css.loginForm}>
          <h2 className={css.loginText}>Login</h2>
          <label className={css.loginLabel} htmlFor={emailFieldId}>
            Enter your email address
          </label>
          <div className={css.passwordField}>
            <Field
              className={css.loginInput}
              type="email"
              name="email"
              placeholder="email@gmail.com"
              id={emailFieldId}
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>
          <label
            className={`${css.loginLabel} ${css.loginLabelWithSpace}`}
            htmlFor={passwordFieldId}
          >
            Enter your password
          </label>
          <div className={css.passwordField}>
            <Field
              className={css.loginInput}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;"
              id={passwordFieldId}
            />
            <Svg
              name={showPassword ? "eye" : "close-eye"}
              styles={css.iconEye}
              onClick={() => setShowPassword((prev) => !prev)}
            />
            <ErrorMessage
              className={css.errorPass}
              name="password"
              component="span"
            />
          </div>
          <button className={css.loginBtn} type="submit">
            Log In
          </button>
          <p className={css.regText}>
            Don`t have an account? &nbsp;
            <Link className={css.regLink} to="/auth/register">
              Register
            </Link>
          </p>
        </Form>
    </Formik>
  );
}
