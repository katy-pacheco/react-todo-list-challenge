import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(5, { message: 'Task name must be at least 5 characters' })
    .max(30, { message: 'Task name must be at most 30 characters' }),

  priority: z.enum(['Urgent', 'High', 'Normal', 'Low'], {
    required_error: 'Priority is required',
  }),

  storyPoints: z
    .number({ invalid_type_error: 'Story points must be a number' })
    .int({ message: 'Story points must be an interger' })
    .min(1, { message: 'Story points must be at least 1' })
    .max(20, { message: 'Story points must be at most 20' }),

  assignee: z
    .string()
    .min(1, { message: 'Assignee is required' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Assignee must contain only letters and spaces',
    }),

  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    },
    {
      message: 'Due Date must be a valid future date',
    },
  ),
  completed: z.boolean().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export type TaskFilter = 'all' | 'active' | 'completed';
