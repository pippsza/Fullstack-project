import { Field, Form, Formik } from "formik";
import css from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <div className={css.formRegContainer}>
      <Formik>
        <Form className={css.regForm}>
          <h2 className={css.regHeader}>Register</h2>
          <p className={css.regText}>
            Join our community of culinary enthusiasts, save your favorite
            recipes, and share your cooking creations
          </p>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Enter your name</span>
            <Field name="name" />
          </label>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Enter your email address</span>
            <Field name="email" />
          </label>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Create a strong password</span>
            <Field name="password" />
          </label>
          <label className={css.regLabel}>
            <span className={css.regSpan}>Repeat your password</span>
            <Field name="password" />
          </label>
          <p>I agree to the Terms of Service and Privacy Policy</p>
          <button className={css.regButton} type="submit">
            Create account
          </button>
          <p className={css.regText}>
            Already have an account?
            <Link className={css.regLogInLabel} to="/login">
              Log in
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
