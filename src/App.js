import React, { useState } from "react";
import { useFormik } from "formik";

function App() {
  let [submitAttempted, setSubmitAttempted] = useState(false);
  let [submitSuccessful, setSubmitSuccessful] = useState(false);
  let [emailClass, setEmailClass] = useState();
  let [passwordClass, setPasswordClass] = useState();
  

  // TODO: add a const called formik assigned to useFormik()

  // const attemptSubmit = () => {
  //   setSubmitAttempted(true);
  // };
  const updateBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      // console.log(`gv: ${submitSuccessful}`);
      alert("Login Successful!");
      setSubmitSuccessful(true);
      updateBackgroundColor("#105736");
      
       //'#198754';
      // setSubmitAttempted(true);
      
    },
    validateOnChange: submitAttempted,
    validateOnBlur: true,
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        setEmailClass("validation-failed");
        errors.email = "Field required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        setEmailClass("validation-failed");
        errors.email = "Username should be an email";
      } else {
        setEmailClass("validation-passed");
      }

      if (!values.password) {
        setPasswordClass("validation-failed");
        errors.password = "Field required";
      } else {
        setPasswordClass("validation-passed");
      }

      return errors;
    },
  });

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group">
          <label>Email</label>
          <input
            id="emailField"
            className={"form-control input " + emailClass}
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={submitSuccessful}
          />
          {formik.errors.email ? (
            <div id="emailError">{formik.errors.email}</div>
          ) : (
            <br />
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            id="pswField"
            className={"form-control input " + passwordClass}
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            disabled={submitSuccessful}
          />
          {formik.errors.password ? (
            <div id="pswError">{formik.errors.password}</div>
          ) : (
            <br />
          )}
        </div>

        <div class="button-container">
          <button
            id="submitBtn"
            className={submitSuccessful ? "btn btn-success" : "btn btn-primary"}
            type="submit"
            onClick={() => setSubmitAttempted(true)} //{attemptSubmit}
            disabled={submitSuccessful}
          >
            {submitSuccessful ? <>&#10003; Success</> : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
