import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./RegisterForm.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import sprite from "../../assets/svg/sprite.svg?url";
export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfimrPassword, setShowConfimrPassword] = useState(false);

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be min 3 chars")
      .max(50, "Must be less then 50 chars")
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Must be min 3 chars")
      .required("This field is required")
      .max(50, "Must be less then 50 chars"),
    password: Yup.string()
      .min(8, "Must be min 8 chars")
      .required("This field is required")
      .max(50, "Must be less then 50 chars"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  return (
    <div className={css.regContainer}>
      <div className={css.formRegContainer}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agree: false,
          }}
          validationSchema={UserSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values, errors }) => (
            <Form className={css.regForm}>
              <h2 className={css.regHeader}>Register</h2>
              <p className={css.regText}>
                Join our community of culinary enthusiasts, save your favorite
                recipes, and share your cooking creations
              </p>
              <label className={css.regLabel}>
                <span className={css.regSpan}>Enter your name</span>
                <Field
                  className={`${css.regField} ${errors.name ? css.error : ""}`}
                  name="name"
                  placeholder="Max"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.errorMess}
                />
              </label>
              <label className={css.regLabel}>
                <span className={css.regSpan}>Enter your email address</span>
                <Field
                  className={`${css.regField} ${errors.name ? css.error : ""}`}
                  name="email"
                  placeholder="email@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.errorMess}
                />
              </label>
              <label className={css.regLabel}>
                <span className={css.regSpan}>Create a strong password</span>
                <div className={css.iconContainer}>
                  <Field
                    className={`${css.regField} ${
                      errors.name ? css.error : ""
                    }`}
                    name="password"
                    placeholder="*********"
                    type={showPassword ? "text" : "password"}
                  />

                  <svg
                    className={css.regEye}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <use href={`${sprite}#icon-eye`}></use>
                  </svg>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.errorMess}
                />
              </label>
              <label className={css.regLabel}>
                <span className={css.regSpan}>Repeat your password</span>
                <div className={css.iconContainer}>
                  <Field
                    className={`${css.regField} ${
                      errors.name ? css.error : ""
                    }`}
                    name="confirmPassword"
                    placeholder="*********"
                    type={showConfimrPassword ? "text" : "password"}
                  />

                  <svg
                    className={css.regEye}
                    onClick={() => setShowConfimrPassword((prev) => !prev)}
                  >
                    <use href={`${sprite}#icon-eye`}></use>
                  </svg>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={css.errorMess}
                />
              </label>
              <label className={css.checkboxContainer}>
                <Field className={css.checkbox} type="checkbox" name="agree" />
                <span className={css.checkmark}>
                  <svg className={css.checkAlternative}>
                    <use href={`${sprite}#icon-check-alternative`}></use>
                  </svg>
                </span>
                <span className={css.regTextAgr}>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>

              <button
                className={css.regButton}
                type="submit"
                disabled={!values.agree}
              >
                Create account
              </button>
              <p className={css.regTextLastChild}>
                Already have an account? <span> </span>
                <Link className={css.regLogInLabel} to="/auth/login">
                  Log in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
