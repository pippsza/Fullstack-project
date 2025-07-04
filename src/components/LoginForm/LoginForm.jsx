import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { toast } from "react-hot-toast";

import Svg from "../Svg/svg.jsx";

import { login } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

const toastStyle = {
  position: "top-left",
  style: {
    background: "var(--light-brown)",
    color: "var(--white)",
    fontSize: "12px",
    borderRadius: "8px",
  },
};

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8, }$/;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .min(3, "Must be min 3 chars")
    .required("This field is required")
    .max(50, "Must be less then 50 chars"),
  password: Yup.string()
    .required("This field is required")
  });

const initialValues = { email: "", password: "" };

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate('/');
        toast.success("Login successful!", toastStyle);
        navigate("/");
      })
      .catch(() => {
        toast.error(
          "Failed to log in. Please check your email or password and try again.",
          toastStyle
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
      {({ errors }) => (
        <Form className={css.loginForm}>
          <h2 className={css.loginText}>Login</h2>
          <label className={css.loginLabel}>Enter your email address</label>
          <div className={css.passwordField}>
            <Field
              className={`${css.loginInput} ${errors.email ? css.err : ""}`}
              type="email"
              name="email"
              placeholder="email@gmail.com"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>
          <label className={`${css.loginLabel} ${css.loginLabelWithSpace}`}>
            Enter your password
          </label>
          <div className={css.passwordField}>
            <Field
              className={`${css.loginInput} ${errors.password ? css.err : ""}`}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;"
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
      )}
    </Formik>
  );
}
