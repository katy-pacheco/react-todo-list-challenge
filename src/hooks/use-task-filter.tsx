import { useState, useMemo } from 'react';
import type { Task, TaskFilter } from '../validation/task';

export default function useTaskFilter(tasks: Task[]) {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    const statusFiltered =
      filter === 'all'
        ? tasks
        : filter === 'active'
          ? tasks.filter((task) => !task.completed)
          : tasks.filter((task) => task.completed);

    if (!searchQuery.trim()) {
      return statusFiltered;
    }

    const query = searchQuery.toLowerCase().trim();
    return statusFiltered.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.assignee && task.assignee.toLowerCase().includes(query)),
    );
  }, [tasks, filter, searchQuery]);

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
