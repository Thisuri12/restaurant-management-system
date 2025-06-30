import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchRestaurantById = async (id: string) => {
  const res = await api.get(`/restaurants/${id}`);
  // If backend returns { data: restaurant }
  return res.data.data;
};

export default api;
