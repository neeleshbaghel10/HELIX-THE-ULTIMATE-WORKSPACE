import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { Task } from '../types/task'

type TaskContextType = {
  tasks: Task[]

  createTask: (
    projectId: number,
    title: string,
    description: string,
    priority: Task['priority'],
  ) => void

  updateTask: (
    id: number,
    title: string,
    description: string,
    priority: Task['priority'],
    status: Task['status'],
  ) => void

  deleteTask: (id: number) => void
}

const TaskContext = createContext<
  TaskContextType | undefined
>(undefined)

const initialTasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: 'Set up React frontend',
    description:
      'Create the initial React application structure.',
    status: 'Done',
    priority: 'High',
  },
  {
    id: 2,
    projectId: 1,
    title: 'Build project dashboard',
    description:
      'Create the main dashboard for HELIX projects.',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 3,
    projectId: 1,
    title: 'Design database schema',
    description:
      'Plan the database structure for projects and tasks.',
    status: 'Todo',
    priority: 'Medium',
  },
  {
    id: 4,
    projectId: 2,
    title: 'Build hero section',
    description:
      'Create the main hero section for the portfolio.',
    status: 'Done',
    priority: 'Medium',
  },
  {
    id: 5,
    projectId: 3,
    title: 'Design authentication',
    description:
      'Plan login and authentication functionality.',
    status: 'Todo',
    priority: 'High',
  },
]

type TaskProviderProps = {
  children: ReactNode
}

export function TaskProvider({
  children,
}: TaskProviderProps) {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks)

  const createTask = (
    projectId: number,
    title: string,
    description: string,
    priority: Task['priority'],
  ) => {
    const newTask: Task = {
      id: Date.now(),
      projectId,
      title,
      description,
      status: 'Todo',
      priority,
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ])
  }

  const updateTask = (
    id: number,
    title: string,
    description: string,
    priority: Task['priority'],
    status: Task['status'],
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              priority,
              status,
            }
          : task,
      ),
    )
  }

  const deleteTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id,
      ),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error(
      'useTasks must be used inside TaskProvider',
    )
  }

  return context
}