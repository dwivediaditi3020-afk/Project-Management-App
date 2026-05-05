import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Auto redirect if already logged in
  if (localStorage.getItem("token")) {
    window.location.href = "/dashboard";
  }

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "14px",
          width: "340px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          textAlign: "center",
          color: "#e2e8f0"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>🔐 Welcome Back</h2>
        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>
          Login to manage your projects
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 1px #3b82f6")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#0f172a",
            color: "white",
            transition: "0.2s"
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 0 1px #3b82f6")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "#0f172a",
            color: "white",
            transition: "0.2s"
          }}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "0.2s"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Demo Credentials */}
        <p style={{ marginTop: "15px", fontSize: "12px", color: "#94a3b8" }}>
          Demo: <br />
          aditi@test.com / 123456
        </p>

        {/* Footer */}
        <p style={{ fontSize: "11px", color: "#64748b", marginTop: "10px" }}>
          Project Management App
        </p>
      </div>
    </div>
  );
}

export default Login;