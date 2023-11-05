import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { AuthContext } from "../context/AuthContext.js";
import Button from "./UI/Button.js";

// import {notify, handleSuccess, handleFailure} from '../util/Notification.js';

import "./LoginForm.css";

function LoginForm() {
  const authContext = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);

  const loginSubmitHandler = (values) => {
    authContext.login(loginFormik.values.email, loginFormik.values.password);
    loginFormik.resetForm();
  };

  const validateLogin = () => {
    const errors = {};
    const email = loginFormik.values.email;
    const password = loginFormik.values.password;
    if (email) {
      let regex = /^[\w-.]+@[\w-]+.[\w-.]+$/;
      // Test the email against the regex and return the result
      if (!regex.test(email)) {
        errors.email = "Invalid email!";
      }
    } else {
      errors.email = "Email cant be empty!";
    }
    if (!password) {
      errors.password = "Password cant be empty!";
    }
    return errors;
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginSubmitHandler,
    validate: validateLogin,
  });

  const signUpSubmitHandler = (values) => {
    // send request to /signup
    authContext.signup(
      signUpFormik.values.email,
      signUpFormik.values.password,
      signUpFormik.values.firstName,
      signUpFormik.values.lastName
    );
    signUpFormik.resetForm();
    setIsSignUp(false);
  };

  const validateSignUp = () => {
    const errors = {};
    const firstName = signUpFormik.values.firstName;
    const lastName = signUpFormik.values.lastName;
    const email = signUpFormik.values.email;
    const password = signUpFormik.values.password;
    const confirmPassword = signUpFormik.values.confirmPassword;
    if (!email) {
      errors.email = "Email cant be empty";
    }
    if (!password) {
      errors.password = "Password cant be empty";
    }
    if (!firstName) {
      errors.firstName = "FirstName cant be empty";
    }
    if (!lastName) {
      errors.lastName = "LastName cant be empty";
    }
    if (!confirmPassword || confirmPassword !== password) {
      errors.confirmPassword = "Password and confirm Password is not same";
    }
    return errors;
  };

  const signUpFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: signUpSubmitHandler,
    validate: validateSignUp,
  });

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <main className="login-page">
      <h1 className="login-title">{isSignUp ? "SignUp" : "Log in"}</h1>
      <form
        onSubmit={
          isSignUp ? signUpFormik.handleSubmit : loginFormik.handleSubmit
        }
        className="login-form"
      >
        {isSignUp && (
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={signUpFormik.values.firstName}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
              className={
                signUpFormik.touched.firstName && signUpFormik.errors.firstName
                  ? `error-field`
                  : ``
              }
            />
            {signUpFormik.touched.firstName && signUpFormik.errors.firstName ? (
              <div className="error-title">{signUpFormik.errors.firstName}</div>
            ) : null}
          </div>
        )}
        {isSignUp && (
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={signUpFormik.values.lastName}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
              className={
                signUpFormik.touched.lastName && signUpFormik.errors.lastName
                  ? `error-field`
                  : ``
              }
            />
            {signUpFormik.touched.lastName && signUpFormik.errors.lastName ? (
              <div className="error-title">{signUpFormik.errors.lastName}</div>
            ) : null}
          </div>
        )}
        {
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={
                isSignUp ? signUpFormik.values.email : loginFormik.values.email
              }
              onChange={
                isSignUp ? signUpFormik.handleChange : loginFormik.handleChange
              }
              onBlur={
                isSignUp ? signUpFormik.handleBlur : loginFormik.handleBlur
              }
              className={
                isSignUp
                  ? signUpFormik.touched.email && signUpFormik.errors.email
                    ? `error-field`
                    : ``
                  : loginFormik.touched.email && loginFormik.errors.email
                  ? `error-field`
                  : ``
              }
            />
            {isSignUp ? (
              signUpFormik.touched.email && signUpFormik.errors.email ? (
                <div className="error-title">{signUpFormik.errors.email}</div>
              ) : null
            ) : loginFormik.touched.email && loginFormik.errors.email ? (
              <div className="error-title">{loginFormik.errors.email}</div>
            ) : null}
          </div>
        }
        {
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Password"
              value={
                isSignUp
                  ? signUpFormik.values.password
                  : loginFormik.values.password
              }
              onChange={
                isSignUp ? signUpFormik.handleChange : loginFormik.handleChange
              }
              onBlur={
                isSignUp ? signUpFormik.handleBlur : loginFormik.handleBlur
              }
              className={
                isSignUp
                  ? signUpFormik.touched.password &&
                    signUpFormik.errors.password
                    ? `error-field`
                    : ``
                  : loginFormik.touched.password && loginFormik.errors.password
                  ? `error-field`
                  : ``
              }
            />
            {isSignUp ? (
              signUpFormik.touched.password && signUpFormik.errors.password ? (
                <div className="error-title">
                  {signUpFormik.errors.password}
                </div>
              ) : null
            ) : loginFormik.touched.password && loginFormik.errors.password ? (
              <div className="error-title">{loginFormik.errors.password}</div>
            ) : null}
          </div>
        }
        {isSignUp && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signUpFormik.values.confirmPassword}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
              className={
                signUpFormik.touched.confirmPassword &&
                signUpFormik.errors.confirmPassword
                  ? `error-field`
                  : ``
              }
            />
            {signUpFormik.touched.confirmPassword &&
            signUpFormik.errors.confirmPassword ? (
              <div className="error-title">
                {signUpFormik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        )}
        <Button
          type={"submit"}
          text={isSignUp ? "Sign Up" : "Login"}
          onClick={
            isSignUp ? signUpFormik.handleSubmit : loginFormik.handleSubmit
          }
          disabled={isSignUp ? !signUpFormik.isValid : !loginFormik.isValid}
        />
        <hr />
        {!isSignUp && (
          <p className="center">Don't have an account? Create one here⬇️</p>
        )}
        {isSignUp && <p className="center">Already a user? Login here⬇️</p>}
        <Button
          type={"button"}
          text={isSignUp ? "Login" : "SignUp"}
          classes={"center"}
          onClick={toggleSignUp}
        />
      </form>
    </main>
  );
}

export default LoginForm;
