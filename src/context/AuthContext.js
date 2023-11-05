import React, { useState } from "react";

// let logoutTimer;

import { toast } from "react-toastify";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    id: "",
    token: "",
  },
  login: (email, password) => {},
  logout: () => {},
  signup: (email, password, firstName, lastName) => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    user: {
      email: "",
      firstName: "",
      lastName: "",
      id: "",
      token: "",
    },
  });

  const logInHandler = (email, password) => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.status === 422) {
          throw new Error("Validation Failed");
        }
        if (result.status !== 200 && result.status !== 201) {
          console.log("Error occurred");
          throw new Error("Could not authenticate you!");
        }
        return result.json();
      })
      .then((resData) => {
        if (resData.status === "success") {
          setUser({
            user: {
              email: resData.user.email,
              firstName: resData.user.firstName,
              lastName: resData.user.lastName,
              id: resData.user.id,
              token: resData.user.token,
            },
            isLoggedIn:
              resData.user.email && resData.user.token && resData.user.id
                ? true
                : false,
          });
          console.log("login successful!");
        } else {
          throw new Error("Could not authenticate you!");
        }
      })
      .catch((err) => {
        console.log("Error occurred while logging in: " + err);
        toast(`${err}`);
      });
  };

  const logOutHandler = () => {
    setUser({
      isLoggedIn: false,
      user: {
        email: "",
        firstName: "",
        lastName: "",
        id: "",
        token: "",
      },
    });
  };

  const signUpHandler = (email, password, firstName, lastName) => {
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (result.status !== 200 && result.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return result.json();
      })
      .then((resData) => {
        if (resData.status === "success") {
          console.log("User signup successful");
          toast("User signup successful");
        }
      })
      .catch((err) => {
        console.log("Error occurred while logging in: " + err);
        toast("User signup failed, " + err);
      });
  };

  const contextValue = {
    user: {
      email: user.user.email,
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      token: user.user.token,
      id: user.user.id,
    },
    isLoggedIn: (user.user.email && user.user.token && user.user.id) || false,
    login: logInHandler,
    logout: logOutHandler,
    signup: signUpHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
