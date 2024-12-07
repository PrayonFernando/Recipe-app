import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const ChangePasswordModal = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8081/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the form and show success message
      setSuccess("Password updated successfully!");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => {
        onClose();
      }, 1500); // Close the modal after 1.5 seconds
    } catch (error) {
      // Handle specific backend errors
      const message =
        error.response?.data?.message || "Failed to update the password.";
      setError(message);
      setSuccess("");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          margin: "auto",
          marginTop: "10%",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ marginTop: 2 }}>
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Update Password
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
