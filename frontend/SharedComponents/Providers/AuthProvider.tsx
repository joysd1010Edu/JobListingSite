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
import type {
  AuthContextType,
  User,
  AuthState,
} from "@/Type/Authentication/Login";

//=== Test User Credentials (for demo purposes) ===
const TEST_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "admin@quickhire.com",
    password: "admin123",
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@quickhire.com",
      role: "admin",
    },
  },
  {
    email: "user@quickhire.com",
    password: "user123",
    user: {
      id: "2",
      name: "Test User",
      email: "user@quickhire.com",
      role: "user",
    },
  },
];

//=== Auth Context ===
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//=== Auth Provider Component ===
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  //=== Initialize Auth State from Storage ===
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const userFromLocalStorage = localStorage.getItem("user");
        const userFromSessionStorage = sessionStorage.getItem("user");
        const storedUser = userFromLocalStorage || userFromSessionStorage;

        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
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
  }, []);

  //=== Login Function (Mock - uses test credentials) ===
  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      //=== Simulate API delay ===
      await new Promise((resolve) => setTimeout(resolve, 800));

      //=== Find matching test user ===
      const matchedUser = TEST_USERS.find(
        (u) => u.email === email && u.password === password,
      );

      if (!matchedUser) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw new Error("Invalid email or password");
      }

      const signedUserData = matchedUser.user;

      //=== Store user data ===
      localStorage.setItem("user", JSON.stringify(signedUserData));
      localStorage.setItem(
        "accessToken",
        `mock-access-token-${signedUserData.id}`,
      );
      localStorage.setItem(
        "refreshToken",
        `mock-refresh-token-${signedUserData.id}`,
      );

      //=== Set Cookies for Middleware ===
      document.cookie = `accessToken=mock-access-token-${signedUserData.id}; path=/; SameSite=Lax`;
      document.cookie = `userData=${encodeURIComponent(
        JSON.stringify(signedUserData),
      )}; path=/; SameSite=Lax`;

      setAuthState({
        user: signedUserData,
        isAuthenticated: true,
        isLoading: false,
      });

      //=== Redirect Based on Role ===
      if (signedUserData.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/jobs");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  //=== Signup Function (Mock) ===
  const signup = async (name: string, email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      //=== Simulate API delay ===
      await new Promise((resolve) => setTimeout(resolve, 800));

      //=== Check if email already exists ===
      const exists = TEST_USERS.find((u) => u.email === email);
      if (exists) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw new Error("Email already registered");
      }

      //=== Create new user (mock) ===
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("accessToken", `mock-access-token-${newUser.id}`);

      document.cookie = `accessToken=mock-access-token-${newUser.id}; path=/; SameSite=Lax`;
      document.cookie = `userData=${encodeURIComponent(
        JSON.stringify(newUser),
      )}; path=/; SameSite=Lax`;

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });

      router.push("/jobs");
    } catch (error) {
      console.error("Signup error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
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
