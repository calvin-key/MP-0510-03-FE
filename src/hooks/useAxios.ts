"use client";

import { axiosInstance } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useAxios = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Request interceptor (without token handling)
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        // No need to add token to headers for now
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor (handling errors like 401)
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err?.response?.status === 401) {
          // Handle unauthorized error (no token for now)
          // This could include redirecting the user to login or showing an error message
        }

        return Promise.reject(err);
      }
    );

    // Cleanup interceptors when component is unmounted
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [queryClient]);

  return { axiosInstance };
};

export default useAxios;
