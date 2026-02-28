"use client";

//=== Imports ===
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useAxios } from "@/Hooks/useAxios";
import type {
  AuthContextType,
  User,
  AuthState,
} from "@/Type/Authentication/Login";

//=== Auth Context ===
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//=== Auth Provider Component ===
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const axios = useAxios();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  //=== Initialize Auth State from Storage ===
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const storedUser =
          localStorage.getItem("user") || sessionStorage.getItem("user");

        if (token && storedUser) {
          // === Verify token with server ===
          try {
            const response = await axios.get("/auth/me");
            const user = response.data.data.user;
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch {
            // === Token invalid, clear storage ===
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setAuthState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //=== Login Function ===
  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await axios.post("/auth/login", { email, password });

      if (!response.data.success) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw new Error(response.data.message || "Login failed");
      }

      const { user, token } = response.data.data;

      //=== Store user data & token ===
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);

      //=== Set Cookies for Middleware ===
      document.cookie = `accessToken=${token}; path=/; SameSite=Lax`;
      document.cookie = `userData=${encodeURIComponent(
        JSON.stringify(user),
      )}; path=/; SameSite=Lax`;

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      //=== Redirect Based on Role ===
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/jobs");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));

      // === Extract message from Axios error ===
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response
      ) {
        const axiosError = error as {
          response: { data: { message?: string } };
        };
        throw new Error(axiosError.response.data.message || "Login failed");
      }
      throw error;
    }
  };

  //=== Signup Function ===
  const signup = async (name: string, email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      if (!response.data.success) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw new Error(response.data.message || "Signup failed");
      }

      const { user, token } = response.data.data;

      //=== Store user data & token ===
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);

      //=== Set Cookies ===
      document.cookie = `accessToken=${token}; path=/; SameSite=Lax`;
      document.cookie = `userData=${encodeURIComponent(
        JSON.stringify(user),
      )}; path=/; SameSite=Lax`;

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      router.push("/jobs");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));

      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response
      ) {
        const axiosError = error as {
          response: { data: { message?: string } };
        };
        throw new Error(axiosError.response.data.message || "Signup failed");
      }
      throw error;
    }
  };

  //=== Logout Function ===
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    //=== Clear Cookies ===
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    router.push("/login");
  };

  //=== Set User Function ===
  const setUser = (user: User | null) => {
    setAuthState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//=== Custom Hook to Use Auth Context ===
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
