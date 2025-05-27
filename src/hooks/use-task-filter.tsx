import { useState, useMemo, useRef, useEffect } from 'react';
import type { Task, TaskFilter } from '../validation/task';

export default function useTaskFilter(tasks: Task[]) {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  const filteredTasks = useMemo(() => {
    const statusFiltered =
      filter === 'all'
        ? tasks
        : filter === 'active'
          ? tasks.filter((task) => !task.completed)
          : tasks.filter((task) => task.completed);

    if (!debouncedQuery.trim()) {
      return statusFiltered;
    }

    const query = debouncedQuery.toLowerCase().trim();
    return statusFiltered.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.assignee && task.assignee.toLowerCase().includes(query)),
    );
  }, [tasks, filter, debouncedQuery]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    }),
    [tasks],
  );

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredTasks,
    counts,
  };
}
