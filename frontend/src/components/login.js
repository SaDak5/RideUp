import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import LocationPinIcon from "@mui/icons-material/LocationPin";
import { Link as RouterLink } from "react-router-dom";
const Login = () => {
  const handleSubmit = () => console.log("login");
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            // value={formData.email}
            // onChange={handleChange}
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Se connecter
          </Button>
        </Box>
        {/* <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid item>
            <Link component={RouterLink} to="/forgot">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register">
              Sign Up
            </Link>
          </Grid>
        </Grid> */}
        <Typography sx={{ mt: 1 }} justifyContent="center">
          Pas encore de compte ?{" "}
          <Link
            component={RouterLink}
            // to="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Inscrivez-vous ici
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
export default Login;
