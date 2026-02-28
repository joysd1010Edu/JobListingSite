//=== Authentication Type Definitions ===

//=== User Interface ===
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

//=== Auth State Interface ===
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

//=== Auth Context Type ===
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

//=== Login Form Data ===
export interface LoginFormData {
  email: string;
  password: string;
}

//=== Signup Form Data ===
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
