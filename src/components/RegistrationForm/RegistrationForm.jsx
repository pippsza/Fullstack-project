import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Svg from "../Svg/svg.jsx";
import { useState } from "react";

import { register } from "../../redux/auth/operations";

import css from "../LoginForm/LoginForm.module.css";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too Short!")
    .max(50, "Name is too Long!")
    .required("Name is Required field!"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required field!"),
  password: Yup.string().required("Password is required field!")
});

const initialValues = { name: "", email: "", password: "" };

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const nameFieldId = nanoid();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 11000) {
          toast.error(
            "This email address is already registered. Try another address."
          );
        } else {
          toast.error("OOPS... Failed to register user. Please try again.");
        }
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form className={css.loginForm}>
        <h2 className={css.loginText}>Register</h2>
        <label className={css.loginLabel} htmlFor={nameFieldId}>
          Enter your name
        </label>
        <Field
          className={css.loginInput}
          type="text"
          name="name"
          placeholder="Your name"
          id={nameFieldId}
        />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label
          className={`${css.loginLabel} ${css.loginLabelWithSpace}`}
          htmlFor={emailFieldId}
        >
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
        <div style={{ position: "relative" }}>
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
          Register
        </button>
      </Form>
    </Formik>
  );
}
