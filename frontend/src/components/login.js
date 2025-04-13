import React, { useState } from "react";
import {
  Avatar,
  Box,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  Link,
  Card,
  CardContent,
  Divider,
  Fade,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Tous les champs sont requis.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("L'email est invalide.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3004/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);

        if (data.role === "passager" || data.role === "conducteur") {
          navigate("/profil");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.error || "Échec de la connexion.");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  const handleShowOptions = (e) => {
    e.preventDefault();
    setShowRoleOptions((prev) => !prev);
  };

  const handleRoleClick = (role) => {
    if (role === "conducteur") {
      navigate("/registerConducteur");
    } else if (role === "passager") {
      navigate("/registerPassager");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL}/localisationn.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      <Card
        sx={{
          display: "flex",
          width: "80%",
          maxWidth: 1000,
          height: "560px",
          boxShadow: 3,
          border: "2px solid #B0B0B0",
          position: "relative",
          zIndex: 2,
          borderRadius: "50px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${process.env.PUBLIC_URL}/login.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: "#B0B0B0",
            borderWidth: 0.5,
          }}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <CardContent sx={{ width: "100%", maxWidth: 450 }}>
            <Avatar
              sx={{
                mx: "auto",
                bgcolor: "primary.main",
                mb: 2,
                padding: 1,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
              Se connecter
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#B0B0B0",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#B0B0B0",
                    },
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Se souvenir de moi"
                sx={{
                  marginBottom: 2,
                  fontSize: "0.9rem",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Se connecter
              </Button>

              {error && (
                <Typography color="error" sx={{ mt: 2 }} align="center">
                  {error}
                </Typography>
              )}

              <Typography sx={{ mt: 3 }} align="center">
                Pas encore de compte ?{" "}
                <Link
                  href="#"
                  onClick={handleShowOptions}
                  sx={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                >
                  Inscrivez-vous ici
                </Link>
              </Typography>

              <Fade in={showRoleOptions} timeout={500}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleRoleClick("conducteur")}
                    sx={{
                      borderColor: "#1976d2",
                      color: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                      },
                    }}
                  >
                    Conducteur
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleRoleClick("passager")}
                    sx={{
                      borderColor: "#1976d2",
                      color: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                      },
                    }}
                  >
                    Passager
                  </Button>
                </Box>
              </Fade>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
