import { useState, useEffect } from "react";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export const useFetch = (url, token = null, auto = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao carregar dados");
      notify("Falha ao buscar dados", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auto) fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
