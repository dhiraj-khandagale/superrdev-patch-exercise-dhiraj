import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
    // If the effect re-runs before this request settles, ignore its result
    let ignore = false;

    setLoading(true);

    fetchTasks({ query, status, page, pageSize })
      .then((data) => {
        if (ignore) return;
        setTasks(data.items);
        setTotal(data.total);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
