import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { FadeLoader } from "react-spinners";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [activeMode, setActiveMode] = useState("signup");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitSignUpForm = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        window.location.href = "/dashboard";
        // console.log(data.token)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmitLoginForm = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <FadeLoader color="#474444" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <div className={styles.logo}>QUIZZIE</div>
          <div className={styles.modeSwitch}>
            <button
              className={`${styles.signUpMode} ${
                activeMode === "signup" ? styles.activeMode : ""
              }`}
              onClick={() => setActiveMode("signup")}
            >
              Sign Up
            </button>
            <button
              className={`${styles.logInMode} ${
                activeMode === "login" ? styles.activeMode : ""
              }`}
              onClick={() => setActiveMode("login")}
            >
              Log In
            </button>
          </div>

          {activeMode === "signup" && (
            <div className={styles.signUpFormContainer}>
              <form
                action={`${process.env.REACT_APP_API_BASE_URL}/api/signup`}
                method="POST"
                onSubmit={handleSubmitSignUpForm}
                className={styles.formContainer}
              >
                <div className={styles.formAttribute}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  {" "}
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="confirmPassword" className={styles.formLabel}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.signUpBtn}
                  onClick={handleSubmitSignUpForm}
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}

          {activeMode === "login" && (
            <div className={styles.logInFormContainer}>
              <form
                action={`${process.env.REACT_APP_API_BASE_URL}/api/login`}
                method="POST"
                onSubmit={handleSubmitLoginForm}
                className={styles.formContainer}
              >
                <div className={styles.formAttribute}>
                  {" "}
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formAttribute}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <button type="submit" className={styles.signUpBtn}>
                  Log In
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;