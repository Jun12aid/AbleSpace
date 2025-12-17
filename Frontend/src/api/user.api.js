import api from "../lib/axios";

export const fetchUsers = () =>
  api.get("/users").then((res) => res.data);
