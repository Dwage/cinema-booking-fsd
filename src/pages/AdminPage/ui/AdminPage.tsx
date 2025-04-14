import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "@/entities/order/api/orderApi";
import type { Order } from "@/shared/api/models";
import styles from "./AdminPage.module.scss";
import { API_BASE_URL } from "@/shared/config/api";

export const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        let shouldLogout = false;
        if (err instanceof Response && err.status === 401) {
          console.error("Unauthorized fetching orders. Logging out.");
          shouldLogout = true;
        } else if (
          err instanceof Error &&
          err.message.toLowerCase().includes("unauthorized")
        ) {
          console.error(
            "Unauthorized error message fetching orders. Logging out."
          );
          shouldLogout = true;
        } else {
          setError(
            err instanceof Error ? err.message : "Failed to load orders"
          );
          console.error("Error fetching orders:", err);
        }

        if (shouldLogout) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      console.log("Logout request sent.");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      navigate("/login");
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading orders: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin Panel - Orders</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Session ID</th>
              <th>Timestamp</th>
              <th>Contact Info</th>
              <th>Seats</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.sessionId}</td>
                <td>{new Date(order.orderTimestamp).toLocaleString()}</td>
                <td>
                  {order.contactInfo.name}
                  <br />
                  {order.contactInfo.email}
                  <br />
                  {order.contactInfo.phone}
                </td>
                <td>
                  <ul>
                    {order.selectedSeats.map((seat) => (
                      <li key={seat.seatNumber}>
                        Seat {seat.seatNumber} ({seat.price} RUB)
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalAmount} RUB</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
