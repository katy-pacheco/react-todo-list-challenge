import {
  CheckCircledIcon,
  CircleIcon,
  PersonIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import type { Task } from '../../validation/task';
import styles from './task-item.module.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
    >
      <button
        onClick={() => task.id && onToggle(task.id)}
        className={styles.toggleButton}
      >
        {task.completed ? (
          <CheckCircledIcon className={styles.checkIcon} />
        ) : (
          <CircleIcon className={styles.checkIcon} />
        )}
      </button>

      <div className={styles.content}>
        <div
          className={`${styles.title} ${task.completed ? styles.titleCompleted : ''}`}
        >
          {task.title}
        </div>

        {task.assignee && (
          <div className={styles.assignee}>
            <PersonIcon className={styles.userIcon} />
            <span>{task.assignee}</span>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => task.id && onDelete(task.id)}
          className={styles.deleteButton}
        >
          <TrashIcon width={20} height={20} />
        </button>
      </div>
    </li>
  );
}
