import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Grid, Grid2, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, "First name should contain only letters")
        .required("First name is required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Last name should contain only letters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number should contain only numbers")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      // Handle the API call on form submission
      try {
        const response = await axios.post(
          "http://localhost:8081/api/auth/register",
          values
        );
        console.log("Registration successful:", response.data);
        navigate("/Home");
      } catch (error) {
        console.error(
          "Registration error:",
          error.response?.data || error.message
        );
        setError("Registration failed. Please try again.");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }
      );

      console.log("Registration successful:", response.data);
      // Redirect to login or home page
      navigate("/Home");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logo} alt="coek logo" className="logo" />

        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid2
            container
            spacing={3}
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* Left Column */}
            <Grid2 xs={12} sm={6}>
              <div className="input-group">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  // helperText={
                  //   formik.touched.firstName && formik.errors.firstName
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#9f9a9bd1", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#9f9a9bd1", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9f9a9bd1", // #f3b4c3
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9f9a9bd1", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9f9a9bd1", // Label color when focused
                      },
                    },
                  }}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="error-text">{formik.errors.firstName}</p>
                )}
              </div>
              <div className="input-group">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  // helperText={
                  //   formik.touched.firstName && formik.errors.firstName
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#9f9a9bd1", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#9f9a9bd1", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9f9a9bd1", // #f3b4c3
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9f9a9bd1", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9f9a9bd1", // Label color when focused
                      },
                    },
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-text">{formik.errors.email}</p>
                )}
              </div>
              <div className="input-group">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  // helperText={
                  //   formik.touched.firstName && formik.errors.firstName
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#9f9a9bd1", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#9f9a9bd1", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9f9a9bd1", // #f3b4c3
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9f9a9bd1", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9f9a9bd1", // Label color when focused
                      },
                    },
                  }}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error-text">{formik.errors.password}</p>
                )}
              </div>
            </Grid2>

            {/* Right Column */}
            <Grid2 xs={12} sm={6}>
              <div className="input-group">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  // helperText={
                  //   formik.touched.firstName && formik.errors.firstName
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#9f9a9bd1", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#9f9a9bd1", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9f9a9bd1", // #f3b4c3
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9f9a9bd1", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9f9a9bd1", // Label color when focused
                      },
                    },
                  }}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="error-text">{formik.errors.lastName}</p>
                )}
              </div>
              <div className="input-group">
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  // helperText={
                  //   formik.touched.firstName && formik.errors.firstName
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#9f9a9bd1", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#9f9a9bd1", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9f9a9bd1", // #f3b4c3
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9f9a9bd1", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9f9a9bd1", // Label color when focused
                      },
                    },
                  }}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="error-text">{formik.errors.phoneNumber}</p>
                )}
              </div>
              <div className="input-group">
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  // helperText={
                  //   formik.touched.firstName && formik.errors.firstName
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#9f9a9bd1", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#9f9a9bd1", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9f9a9bd1", // #f3b4c3
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9f9a9bd1", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9f9a9bd1", // Label color when focused
                      },
                    },
                  }}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="error-text">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </Grid2>
          </Grid2>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="register-button">
              Create Account
            </button>
          </div>
        </form>
        <p className="login-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
