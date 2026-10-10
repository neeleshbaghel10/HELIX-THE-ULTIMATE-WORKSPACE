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
    sprintId: number | null,
    title: string,
    description: string,
    priority: Task['priority'],
  ) => void

  updateTask: (
    id: number,
    sprintId: number | null,
    title: string,
    description: string,
    priority: Task['priority'],
    status: Task['status'],
  ) => void

  updateTaskStatus: (
    id: number,
    status: Task['status'],
  ) => void

  reorderTask: (
    taskId: number,
    newStatus: Task['status'],
    overTaskId?: number,
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
    sprintId: 1,
    title: 'Set up React frontend',
    description:
      'Create the initial React application structure.',
    status: 'Done',
    priority: 'High',
  },
  {
    id: 2,
    projectId: 1,
    sprintId: 1,
    title: 'Build project dashboard',
    description:
      'Create the main dashboard for HELIX projects.',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 3,
    projectId: 1,
    sprintId: null,
    title: 'Design database schema',
    description:
      'Plan the database structure for projects and tasks.',
    status: 'Todo',
    priority: 'Medium',
  },
  {
    id: 4,
    projectId: 2,
    sprintId: 3,
    title: 'Build hero section',
    description:
      'Create the main hero section for the portfolio.',
    status: 'Done',
    priority: 'Medium',
  },
  {
    id: 5,
    projectId: 3,
    sprintId: null,
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
    sprintId: number | null,
    title: string,
    description: string,
    priority: Task['priority'],
  ) => {
    const newTask: Task = {
      id: Date.now(),
      projectId,
      sprintId,
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
    sprintId: number | null,
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
              sprintId,
              title,
              description,
              priority,
              status,
            }
          : task,
      ),
    )
  }

  const updateTaskStatus = (
    id: number,
    status: Task['status'],
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task,
      ),
    )
  }

  const reorderTask = (
    taskId: number,
    newStatus: Task['status'],
    overTaskId?: number,
  ) => {
    setTasks((currentTasks) => {
      const draggedTask = currentTasks.find(
        (task) => task.id === taskId,
      )

      if (!draggedTask) {
        return currentTasks
      }

      const remainingTasks = currentTasks.filter(
        (task) => task.id !== taskId,
      )

      const updatedTask: Task = {
        ...draggedTask,
        status: newStatus,
      }

      if (overTaskId === undefined) {
        return [
          ...remainingTasks,
          updatedTask,
        ]
      }

      const overTaskIndex = remainingTasks.findIndex(
        (task) => task.id === overTaskId,
      )

      if (overTaskIndex === -1) {
        return [
          ...remainingTasks,
          updatedTask,
        ]
      }

      return [
        ...remainingTasks.slice(0, overTaskIndex),
        updatedTask,
        ...remainingTasks.slice(overTaskIndex),
      ]
    })
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
        updateTaskStatus,
        reorderTask,
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