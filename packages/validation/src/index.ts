import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean(),
  createdAt: z.date(),
})

export type Task = z.infer<typeof taskSchema>

export * from './auth'
