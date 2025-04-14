import type { LoginDto } from "./models";
import { API_BASE_URL } from "@/shared/config/api";

export interface LoginSuccessResponse {
  message: string;
}

export const loginUser = async (
  credentials: LoginDto
): Promise<LoginSuccessResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let errorMessage = `Login failed with status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return response.json();
};

export const checkAuthStatus = async (): Promise<{
  isAuthenticated: boolean;
  user?: any;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const user = await response.json();
      return { isAuthenticated: true, user };
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    return { isAuthenticated: false };
  }
};
