import { io } from "socket.io-client";
import { useEffect } from "react";

let socket;

export const useSocket = () => {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

    socket = io(API_URL, {
      withCredentials: true,
    });

    return () => {
      socket?.disconnect();
    };
  }, []);
};
