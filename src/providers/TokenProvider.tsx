"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FC, PropsWithChildren, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fromUnixTime, isAfter } from "date-fns";
import { logoutAction } from "@/redux/slices/userSlice";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const tokenExpiry = fromUnixTime(decodedToken.exp!);

          if (isAfter(new Date(), tokenExpiry)) {
            localStorage.removeItem("blog-storage");
            dispatch(logoutAction());
          }
        } catch (error) {
          localStorage.removeItem("blog-storage");
          dispatch(logoutAction());
        }
      }
    };

    const inteval = setInterval(checkTokenValidity, 1500);

    return () => clearInterval(inteval);
  }, [token, dispatch]);
  return <>{children}</>;
};

export default TokenProvider;
