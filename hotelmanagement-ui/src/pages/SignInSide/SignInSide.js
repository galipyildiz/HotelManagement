import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function SignInSide() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    await login(email, password);
  };

  const login = async (email, password) => {
    try {
      setError("");
      const response = await api.post("/login", {
        email: email,
        password: password,
      });
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error.response) {
        let status = error.response.status;
        let errorMessage = "";
        if (error.response.data) {
          errorMessage =
            error.response.data.title + " " + error.response.data.detail;
        }
        setError(status + " " + errorMessage);
      } else if (error.request) {
        // İstek yapıldı ama hiçbir yanıt alınamadı
        setError("No response was received");
      } else {
        // İstek yapılırken bir hata oluştu
        setError("Error: " + error.message);
      }
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={error.length > 0}
              helperText={error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={error.length > 0}
              helperText={error}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  onClick={(e) => handleSignUpClick(e)}
                  href="#"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignInSide;
