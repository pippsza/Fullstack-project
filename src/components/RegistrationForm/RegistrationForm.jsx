import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { register } from '../../redux/auth/operations';

import css from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too Short!')
    .max(50, 'Name is too Long!')
    .required('Name is Required field!'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
      .required('Password is required field!'),
});

const initialValues = { name: '', email: '', password: '' };

export default function RegistrationForm() {
  const navigate = useNavigate();
  const nameFieldId = nanoid();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
       navigate("/private");
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
      <Form className={css.registrationForm}>
        <label className={css.registrationLabel} htmlFor={nameFieldId}>
          Name
        </label>
        <Field
          className={css.registrationInput}
          type="text"
          name="name"
          id={nameFieldId}
        />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label
          className={`${css.registrationLabel} ${css.registrationLabelWithSpace}`}
          htmlFor={emailFieldId}
        >
          Email
        </label>
        <Field
          className={css.registrationInput}
          type="text"
          name="email"
          id={emailFieldId}
        />
        <ErrorMessage className={css.errorMail} name="email" component="span" />
        <label
          className={`${css.registrationLabel} ${css.registrationLabelWithSpace}`}
          htmlFor={passwordFieldId}
        >
          Password
        </label>
        <Field
          className={css.registrationInput}
          type="text"
          name="password"
          id={passwordFieldId}
        />
        <ErrorMessage className={css.errorPass} name="password" component="span" />
        <button className={css.registrationBtn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};