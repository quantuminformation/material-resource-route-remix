import { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "@remix-run/react";

export default function Login() {
  const [username, setUsername] = useState("ipgautomotive");
  const [password, setPassword] = useState("carmaker");
  const [error, setError] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("user");
    if (storedUsername) {
      // Redirect to the login page if there's no user in localStorage
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  function handleLogin() {
    if (username === "ipgautomotive" && password === "carmaker") {
      localStorage.setItem("user", username);
      navigate("/");
    } else {
      setError("Incorrect username or password.");
    }
  }

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
}
