import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "@remix-run/react";

export default function Login() {
  const [username, setUsername] = useState("ipgautomotive");
  const [password, setPassword] = useState("carmaker");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("user");
    if (storedUsername) {
      // Redirect to the home page if there's a user in localStorage
      navigate("/");
    }
  }, []);

  function handleLogin() {
    if (username === "ipgautomotive" && password === "carmaker") {
      localStorage.setItem("user", username);
      navigate("/");
    } else {
      setError("Incorrect username or password.");
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Box>
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
