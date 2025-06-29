import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { login } from '../../redux/auth/operations';

import css from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required field!"),
  password: Yup.string().required("Password is required field!"),
});

const initialValues = { email: "", password: "" };

export default function LoginForm() {
  const navigate = useNavigate();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate('/private');
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
        <label className={css.loginLabel} htmlFor={emailFieldId}>
          Enter your email address
        </label>
        <Field
          className={css.loginInput}
          type="text"
          name="email"
          id={emailFieldId}
        />
        <ErrorMessage className={css.error} name="email" component="span" />
        <label
          className={`${css.loginLabel} ${css.loginLabelWithSpace}`}
          htmlFor={passwordFieldId}
        >
          Enter your password
        </label>
        <Field
          className={css.loginInput}
          type="text"
          name="password"
          id={passwordFieldId}
        />
        <ErrorMessage
          className={css.errorPass}
          name="password"
          component="span"
        />
        <button className={css.loginBtn} type="submit">
          Log In
        </button>
        <p>Don`t have an account?</p><a href=""> register</a>
      </Form>
    </Formik>
  );
}
