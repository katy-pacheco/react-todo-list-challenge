import { useState, useEffect } from 'react';
import { TaskSchema, type Task } from '../validation/task';

const STORAGE_KEY = 'todo-tasks';

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          const validTasks = parsedTasks.filter((task: unknown) => {
            try {
              TaskSchema.parse(task);
              return true;
            } catch (error) {
              console.error('Invalid task data:', error);
              return false;
            }
          }) as Task[];

          setTasks(validTasks);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = (tasksToSave: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
  };

  const addTask = (data: Task) => {
    try {
      const newTask = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
      };
      const parsedTask = TaskSchema.parse(newTask);
      const updatedTasks = [parsedTask, ...tasks];

      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Failed to add task:', error);
      return false;
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (id: string, updatedFields: Partial<Omit<Task, 'id'>>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  };
}
