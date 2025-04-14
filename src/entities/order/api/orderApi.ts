import { API_BASE_URL } from "@/shared/config/api";
import type { Order, OrderPayload } from "../model/types";

export const submitOrder = async (orderData: OrderPayload): Promise<Order> => {
  const url = `${API_BASE_URL}/orders`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText || ""}`
      );
    }

    const createdOrder: Order = await response.json();
    return createdOrder;
  } catch (error) {
    console.error("Failed to submit order:", error);
    throw error;
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid or expired token.");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch orders: ${response.status}`
    );
  }

  return response.json();
};
