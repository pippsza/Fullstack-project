import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Svg from "../../common/Svg/svg.jsx";
import { login } from "../../../redux/auth/operations";

import css from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required field!"),
  password: Yup.string().required("Password is required field!")
});

const initialValues = { email: "", password: "" };

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        let message =
          "Failed to log in. Please check your email or password and try again.";
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          message = error.response.data.message;
        }
        toast.error(message);
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
        <Field
          className={css.loginInput}
          type="email"
          name="email"
          placeholder="email@gmail.com"
          id={emailFieldId}
        />
        <ErrorMessage className={css.error} name="email" component="span" />
        <label
          className={`${css.loginLabel} ${css.loginLabelWithSpace}`}
          htmlFor={passwordFieldId}
        >
          Enter your password
        </label>
        <div>
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
        </div>
        <ErrorMessage
          className={css.errorPass}
          name="password"
          component="span"
        />
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
