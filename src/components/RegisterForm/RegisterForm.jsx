import { Field, Form, Formik } from "formik";
import css from "./RegisterForm.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import sprite from "../../assets/svg/sprite.svg?url";
export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfimrPassword, setShowConfimrPassword] = useState(false);

  return (
    <div className={css.formRegContainer}>
      <Formik initialValues={{ agree: false }}>
        <Form className={css.regForm}>
          <h2 className={css.regHeader}>Register</h2>
          <p className={css.regText}>
            Join our community of culinary enthusiasts, save your favorite
            recipes, and share your cooking creations
          </p>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Enter your name</span>
            <Field className={css.regField} name="name" placeholder="Max" />
          </label>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Enter your email address</span>
            <Field
              className={css.regField}
              name="email"
              placeholder="email@gmail.com"
            />
          </label>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Create a strong password</span>
            <div className={css.iconContainer}>
              <Field
                className={css.regField}
                name="password"
                placeholder="*********"
                type={showPassword ? "text" : "password"}
              />
              <svg className={css.regEye}>
                <use href={`${sprite}#icon-eye`}></use>
              </svg>
            </div>
          </label>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Repeat your password</span>
            <div className={css.iconContainer}>
              <Field
                className={css.regField}
                name="confirmPassword"
                placeholder="*********"
                type={showConfimrPassword ? "text" : "password"}
              />
              <svg
                className={css.regEye}
                width="16"
                height="14"
                viewBox="0 0 32 32"
                onClick={() => setShowConfimrPassword((prev) => !prev)}
              >
                <path
                  d="M19.214 22.65c-1.086 0.504-2.291 0.833-3.56 0.833-4.779 0-8.654-4.655-8.654-5.838 0-0.67 1.245-2.456 3.194-3.878M23.269 19.516c0.662-0.797 1.038-1.502 1.038-1.871 0-1.183-3.874-5.837-8.654-5.837 2.103 0 3.808 1.691 3.808 3.777M15.654 19.362c-2.103 0-3.808-1.691-3.808-3.777M25 11.807c-2.636-2.181-5.713-3.434-9-3.434-1.185 0-2.342 0.163-3.462 0.473M7 11.807c0.244-0.202 0.492-0.396 0.744-0.582M7 7l16.714 16.875"
                  strokeWidth="1.3333"
                  strokeMiterlimit="4"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                ></path>
              </svg>
            </div>
          </label>
          <label className={css.checkBoxContainer}>
            <Field
              className={css.regFieldChekcBox}
              type="checkbox"
              name="agree"
            />
            <span className={css.checkMark}></span>
            <span className={css.regTextAgr}>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
        </Form>
      </Formik>
      <button className={css.regButton} type="submit">
        Create account
      </button>
      <p className={css.regTextLastChild}>
        Already have an account? <span> </span>
        <Link className={css.regLogInLabel} to="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}
