import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  async function handleLogin(formValue: {
    username: string;
    password: string;
  }) {
    const { username, password } = formValue;

    setMessage("");

    //login(username, password).then(
    // async function login(username: string, password: string) {
    return await axios
      .post("https://localhost:44317/api/Login/gettoken", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          setLoading(true);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        // return response.data;
      })
      .catch((err: Error) => {
        console.log(err);
        alert("Username and Password is incorrect");
      });
  }
  if (loading) {
    return <Navigate to="/Display"></Navigate>;
  }

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="Form">
          <div>
            <div>
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="input" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="input" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="button" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default Login;
