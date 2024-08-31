import { useMutation } from "@tanstack/react-query";

export interface AuthData {
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    fullName?: string;
  };
  error?: string;
}

const authRequest = async (
  url: string,
  data: AuthData
): Promise<AuthResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "Authentication failed");
  }

  return response.json();
};

export const useAuth = (type: "login" | "register") => {
  const url = type === "register" ? "/api/register" : "/api/login";

  return useMutation<AuthResponse, Error, AuthData>({
    mutationFn: (data: AuthData) => authRequest(url, data),
    onError: (error) => {
      console.error("Authentication error:", error.message);
    },
  });
};
