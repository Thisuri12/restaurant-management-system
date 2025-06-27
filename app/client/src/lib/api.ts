import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchRestaurantById = async (id: string) => {
  const res = await api.get(`/restaurants/${id}`);
  return res.data;
};

export default api;
