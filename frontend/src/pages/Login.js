import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save the token in localStorage
      localStorage.setItem("userToken", response.data.token);

      // Redirect to the home page
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="coek logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <TextField
              id="outlined-basic"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#9f9a9bd1", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#9f9a9bd1", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9f9a9bd1", // Border color when focused
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
          </div>
          <div className="input-group">
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#9f9a9bd1", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#9f9a9bd1", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9f9a9bd1", // Border color when focused
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
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            SIGN IN
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
