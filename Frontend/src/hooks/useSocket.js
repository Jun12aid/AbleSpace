import { socket } from "../lib/socket";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useSocket = () => {
  const { data: user } = useAuth();

  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id);

    socket.on("taskAssigned", (task) => {
      alert(`New task assigned: ${task.title}`);
    });

    return () => {
      socket.off("taskAssigned");
    };
  }, [user]);
};
