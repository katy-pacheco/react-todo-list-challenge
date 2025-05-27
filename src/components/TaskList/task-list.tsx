import type { Task } from '../../validation/task';
import TaskItem from '../TaskItem/task-item';
import styles from './task-list.module.css';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  searchQuery,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.container}>
        {searchQuery ? (
          <>
            <h3 className={styles.emptyTitle}>No matching tasks found</h3>
            <p className={styles.emptyText}>Try a different search term</p>
          </>
        ) : (
          <>
            <h3 className={styles.emptyTitle}>No tasks yet</h3>
          </>
        )}
      </div>
    );
  }

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
