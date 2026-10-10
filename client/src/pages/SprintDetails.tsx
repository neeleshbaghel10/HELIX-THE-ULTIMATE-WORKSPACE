import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'

import { useProjects } from '../context/ProjectContext'
import { useTasks } from '../context/TaskContext'
import { useSprints } from '../context/SprintContext'

import type { Task } from '../types/task'

import TaskModal from '../components/TaskModal'
import DeleteTaskDialog from '../components/DeleteTaskDialog'

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

function TaskCard({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
  } = useDraggable({
    id: task.id,
  })

  const {
    setNodeRef: setDroppableNodeRef,
  } = useDroppable({
    id: task.id,
  })

  const setNodeRef = (node: HTMLElement | null) => {
    setDraggableNodeRef(node)
    setDroppableNodeRef(node)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">

        <button
          type="button"
          {...listeners}
          {...attributes}
          className="mt-1 cursor-grab text-slate-600 hover:text-slate-300 active:cursor-grabbing"
          title="Drag task"
        >
          ⋮⋮
        </button>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <h3 className="font-medium text-white">
              {task.title}
            </h3>

            <span
              className={`shrink-0 rounded-full px-2 py-1 text-xs ${
                task.priority === 'High'
                  ? 'bg-red-500/10 text-red-400'
                  : task.priority === 'Medium'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-slate-800 text-slate-400'
              }`}
            >
              {task.priority}
            </span>

          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {task.description}
          </p>

          <div className="mt-4 flex gap-2">

            <button
              type="button"
              onClick={() => onEdit(task)}
              className="rounded-md border border-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-white"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(task)}
              className="rounded-md border border-slate-800 px-3 py-1.5 text-xs text-red-400 hover:border-red-900 hover:text-red-300"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

type KanbanColumnProps = {
  status: Task['status']
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

function KanbanColumn({
  status,
  tasks,
  onEdit,
  onDelete,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] rounded-xl border p-4 transition ${
        isOver
          ? 'border-slate-500 bg-slate-900/80'
          : 'border-slate-800 bg-slate-950/40'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-sm font-semibold text-white">
          {status}
        </h2>

        <span className="rounded-full bg-slate-900 px-2 py-1 text-xs text-slate-500">
          {tasks.length}
        </span>

      </div>

      <div className="space-y-3">

        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-800 px-4 py-10 text-center text-sm text-slate-600">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

      </div>
    </div>
  )
}

function SprintDetails() {
  const { sprintId } = useParams()

  const { sprints } = useSprints()
  const { projects } = useProjects()

  const {
    tasks,
    createTask,
    updateTask,
    reorderTask,
    deleteTask,
  } = useTasks()

  const sprint = sprints.find(
    (item) => item.id === Number(sprintId),
  )

  const project = sprint
    ? projects.find(
        (item) => item.id === sprint.projectId,
      )
    : undefined

  const sprintTasks = sprint
    ? tasks.filter(
        (task) => task.sprintId === sprint.id,
      )
    : []

  const todoTasks = sprintTasks.filter(
    (task) => task.status === 'Todo',
  )

  const inProgressTasks = sprintTasks.filter(
    (task) => task.status === 'In Progress',
  )

  const doneTasks = sprintTasks.filter(
    (task) => task.status === 'Done',
  )

  const totalTasks = sprintTasks.length

  const completedTasks = doneTasks.length

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100,
        )

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false)

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null)

  const [taskTitle, setTaskTitle] =
    useState('')

  const [taskDescription, setTaskDescription] =
    useState('')

  const [taskPriority, setTaskPriority] =
    useState<Task['priority']>('Medium')

  const [taskStatus, setTaskStatus] =
    useState<Task['status']>('Todo')

  const [deleteTarget, setDeleteTarget] =
    useState<Task | null>(null)

  const resetTaskForm = () => {
    setEditingTaskId(null)
    setTaskTitle('')
    setTaskDescription('')
    setTaskPriority('Medium')
    setTaskStatus('Todo')
  }

  const openCreateTaskModal = () => {
    resetTaskForm()
    setIsTaskModalOpen(true)
  }

  const openEditTaskModal = (task: Task) => {
    setEditingTaskId(task.id)
    setTaskTitle(task.title)
    setTaskDescription(task.description)
    setTaskPriority(task.priority)
    setTaskStatus(task.status)
    setIsTaskModalOpen(true)
  }

  const closeTaskModal = () => {
    setIsTaskModalOpen(false)
    resetTaskForm()
  }

  const handleTaskSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!sprint) {
      return
    }

    if (!taskTitle.trim()) {
      return
    }

    if (editingTaskId !== null) {
      updateTask(
        editingTaskId,
        sprint.id,
        taskTitle.trim(),
        taskDescription.trim(),
        taskPriority,
        taskStatus,
      )
    } else {
      createTask(
        sprint.projectId,
        sprint.id,
        taskTitle.trim(),
        taskDescription.trim(),
        taskPriority,
      )
    }

    closeTaskModal()
  }

  const handleDeleteTask = () => {
    if (!deleteTarget) {
      return
    }

    deleteTask(deleteTarget.id)
    setDeleteTarget(null)
  }

  const handleDragEnd = (
    event: DragEndEvent,
  ) => {
    const { active, over } = event

    if (!over) {
      return
    }

    const taskId = Number(active.id)

    const draggedTask = sprintTasks.find(
      (task) => task.id === taskId,
    )

    if (!draggedTask) {
      return
    }

    const overId = over.id

    const validStatuses: Task['status'][] = [
      'Todo',
      'In Progress',
      'Done',
    ]

    if (
      typeof overId === 'string' &&
      validStatuses.includes(
        overId as Task['status'],
      )
    ) {
      reorderTask(
        taskId,
        overId as Task['status'],
      )

      return
    }

    const overTaskId = Number(overId)

    const overTask = sprintTasks.find(
      (task) => task.id === overTaskId,
    )

    if (!overTask) {
      return
    }

    reorderTask(
      taskId,
      overTask.status,
      overTask.id,
    )
  }

  if (!sprint) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Sprint not found
        </h1>

        <Link
          to="/sprints"
          className="mt-4 inline-block text-sm text-slate-400 hover:text-white"
        >
          ← Back to Sprints
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <div>

        <Link
          to="/sprints"
          className="text-sm text-slate-500 hover:text-white"
        >
          ← Back to Sprints
        </Link>

        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-2xl font-semibold text-white">
                {sprint.name}
              </h1>

              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400">
                {sprint.status}
              </span>

            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {sprint.goal}
            </p>

            {project && (
              <Link
                to={`/projects/${project.id}`}
                className="mt-3 inline-block text-sm text-slate-400 hover:text-white"
              >
                Project: {project.name}
              </Link>
            )}

          </div>

          <button
            type="button"
            onClick={openCreateTaskModal}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
          >
            + Add Task
          </button>

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-4">

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-sm text-slate-500">
            Progress
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {progress}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-sm text-slate-500">
            Todo
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {todoTasks.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {inProgressTasks.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-sm text-slate-500">
            Done
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {doneTasks.length}
          </p>
        </div>

      </div>

      <div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Sprint Board
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Drag tasks between columns or reorder them within a column.
          </p>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid gap-4 lg:grid-cols-3">

            <KanbanColumn
              status="Todo"
              tasks={todoTasks}
              onEdit={openEditTaskModal}
              onDelete={setDeleteTarget}
            />

            <KanbanColumn
              status="In Progress"
              tasks={inProgressTasks}
              onEdit={openEditTaskModal}
              onDelete={setDeleteTarget}
            />

            <KanbanColumn
              status="Done"
              tasks={doneTasks}
              onEdit={openEditTaskModal}
              onDelete={setDeleteTarget}
            />

          </div>
        </DndContext>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

          <p className="text-sm text-slate-500">
            Start Date
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {sprint.startDate}
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

          <p className="text-sm text-slate-500">
            End Date
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {sprint.endDate}
          </p>

        </div>

      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        editingTaskId={editingTaskId}
        title={taskTitle}
        description={taskDescription}
        priority={taskPriority}
        status={taskStatus}
        sprintId={sprint.id}
        sprints={[sprint]}
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        onPriorityChange={setTaskPriority}
        onStatusChange={setTaskStatus}
        onSprintChange={() => {}}
        onSubmit={handleTaskSubmit}
        onClose={closeTaskModal}
      />

      <DeleteTaskDialog
        task={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteTask}
      />

    </div>
  )
}

export default SprintDetails