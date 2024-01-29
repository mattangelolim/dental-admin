import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { postLogin } from "../services/postLogin";
// import { postAuditLog } from "../services/postAuditLog";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Breddas Back Office
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    console.log(username, password);

    const successAdmin = username === "admin" && password === "admin";

    if (successAdmin) {
      Cookies.set("token", "admin", { expires: 1 });
      navigate("/Home");
      toast.success("Successfully logged in.");
    } else {
      toast.error("Invalid Credentials.");
    }

    // const result = await postLogin(username, password);

    // if (result.admin) {
    //   localStorage.setItem("username", result.admin.username);
    //   localStorage.setItem("user_id", result.admin.user_id);

    //   await postAuditLog(
    //     result.admin.user_id,
    //     result.admin.username,
    //     "logged in",
    //     "Login"
    //   );
    //   Cookies.set("token", "admin", { expires: 1 });
    //   navigate("/reports/ggr");
    //   toast.success("Successfully logged in.");
    // } else {
    //   toast.error("Invalid Credentials.");
    // }
  };

  return (
    <div className="h-screen bg-gray-300 flex justify-center items-center">
      <Box className="bg-white w-[25%] rounded-lg p-10 flex flex-col gap-2 items-center">
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            fontSize: "2rem",
          }}
        >
          Dental Admin
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "300",
            fontSize: "1rem",
          }}
        >
          Welcome Admin!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            inputProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            InputLabelProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            inputProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            InputLabelProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            className="w-full bg-[#182c34] py-4 mt-5"
          >
            Sign In
          </Button>

          {/* <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            href="/signup"
            variant="body2"
            sx={{ fontFamily: "Poppins, sans serif" }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid> */}
        </Box>
      </Box>
    </div>
  );
}
