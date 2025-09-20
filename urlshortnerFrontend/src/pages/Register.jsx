import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = "http://localhost:8000/api/v1/users/register";

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Registration failed", response);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default RegisterPage;
