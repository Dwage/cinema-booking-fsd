import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/shared/api/auth";
import styles from "./LoginPage.module.scss";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const loginResponse = await loginUser({ username, password });
      console.log(loginResponse.message);

      console.log("Login successful, navigating to /admin...");
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "An some error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Admin Login</h1>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
            disabled={isLoading}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            disabled={isLoading}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
