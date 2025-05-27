import { useForm } from 'react-hook-form';
import { type Task, TaskSchema } from '../../validation/task';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './task-form.module.css';

interface TaskInputProps {
  onAddTask: (data: Task) => boolean;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(TaskSchema),
  });

  const onSubmit = (data: Task) => {
    console.log(data);
    const success = onAddTask(data);
    if (success) {
      reset();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.taskForm}>
        <div>
          <label>Task </label>
          <input
            type="text"
            placeholder="Task"
            autoFocus
            {...register('title')}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Assignee</label>
          <input
            type="text"
            placeholder="Assignee name"
            {...register('assignee')}
          />
          {errors.assignee && <p>{errors.assignee.message}</p>}
        </div>

        <div>
          <label>Priority</label>
          <select {...register('priority')}>
            <option value="" disabled hidden>
              Select priority
            </option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && <p>{errors.priority.message}</p>}
        </div>

        <div>
          <label>Story Points</label>
          <input
            type="number"
            placeholder="Story points"
            {...register('storyPoints', { valueAsNumber: true })}
          />
          {errors.storyPoints && <p>{errors.storyPoints.message}</p>}
        </div>

        <div>
          <label>Due Date</label>
          <input type="date" {...register('dueDate')} />
          {errors.dueDate && <p>{errors.dueDate.message}</p>}
        </div>

        <div>
          <button type="submit">
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
}
