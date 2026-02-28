"use client";

//=== Imports ===
import React, { type ReactNode, useMemo } from "react";
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { AxiosContext } from "@/Hooks/useAxios";

//=== Axios Provider Props ===
interface AxiosProviderProps {
  children: ReactNode;
  baseURL?: string;
}

//=== Extended Config with Retry Flag ===
interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//=== Axios Provider Component ===
export const AxiosProvider: React.FC<AxiosProviderProps> = ({
  children,
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8000/api/",
}) => {
  //=== Track Document Visibility ===
  const isTabActiveRef = React.useRef(true);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  //=== Create Axios Instance (Memoized) ===
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    //=== Request Interceptor ===
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token =
          localStorage.getItem("accessToken") ||
          sessionStorage.getItem("accessToken");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (process.env.NODE_ENV === "development") {
          console.log(
            `API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
          );
        }

        return config;
      },
      (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      },
    );

    //=== Response Interceptor ===
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            `API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`,
          );
        }
        return response;
      },
      async (error: {
        config: ExtendedInternalAxiosRequestConfig;
        response?: { status: number };
        code?: string;
        message?: string;
      }) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
          return Promise.reject(error);
        }

        //=== Handle 401 Unauthorized ===
        if (error.response?.status === 401) {
          if (error.config._retry) {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(error);
          }

          error.config._retry = true;

          const refreshToken =
            localStorage.getItem("refreshToken") ||
            sessionStorage.getItem("refreshToken");

          if (!refreshToken) {
            window.location.href = "/login";
            return Promise.reject(error);
          }

          try {
            const response = await axios.post(
              `${baseURL}/users/refresh-token`,
              { token: refreshToken },
              {
                timeout: 5000,
                headers: { "Content-Type": "application/json" },
              },
            );

            if (response.status === 200 && response.data.accessToken) {
              const {
                accessToken,
                refreshToken: newRefreshToken,
                user,
              } = response.data;

              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", newRefreshToken);
              localStorage.setItem("user", JSON.stringify(user));

              error.config.headers.Authorization = `Bearer ${accessToken}`;
              return axios.request(error.config);
            }
          } catch (refreshError) {
            console.log("Refresh Token Failed", refreshError);
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/login";
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );

    return instance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};
