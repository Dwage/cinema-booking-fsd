import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkAuthStatus } from "@/shared/api/auth";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    checkAuthStatus()
      .then((result) => {
        if (isMounted) {
          setIsAuthenticated(result.isAuthenticated);
        }
      })
      .catch((error) => {
        console.error("Header: Failed to check auth status:", error);
        if (isMounted) {
          setIsAuthenticated(false);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Cinema-Sessions
        </Link>

        <nav className={styles.navigation}>
          {isLoading ? (
            <span className={styles.navLinkLoading}>...</span>
          ) : isAuthenticated ? (
            <Link to="/admin" className={styles.navLink}>
              Admin Panel
            </Link>
          ) : (
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
