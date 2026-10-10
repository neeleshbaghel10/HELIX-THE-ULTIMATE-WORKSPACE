import { useState } from 'react'
import type { FormEvent } from 'react'

import { useTasks } from '../context/TaskContext'
import { useProjects } from '../context/ProjectContext'
import { useSprints } from '../context/SprintContext'

import TaskModal from '../components/TaskModal'
import DeleteTaskDialog from '../components/DeleteTaskDialog'

import type { Task } from '../types/task'

function Tasks() {
  const {
    tasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks()

  const { projects } = useProjects()
  const { sprints } = useSprints()

  const [searchQuery, setSearchQuery] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState<'All' | Task['status']>('All')

  const [priorityFilter, setPriorityFilter] =
    useState<'All' | Task['priority']>('All')

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

  const [taskSprintId, setTaskSprintId] =
    useState<number | null>(null)

  const [taskToDelete, setTaskToDelete] =
    useState<Task | null>(null)

  const getProjectName = (projectId: number) => {
    const project = projects.find(
      (project) => project.id === projectId,
    )

    return project?.name ?? 'Unknown Project'
  }

  const getSprintName = (
    sprintId: number | null,
  ) => {
    if (!sprintId) {
      return 'No Sprint'
    }

    const sprint = sprints.find(
      (sprint) => sprint.id === sprintId,
    )

    return sprint?.name ?? 'Unknown Sprint'
  }

  const getTaskSprints = (task: Task) => {
    return sprints.filter(
      (sprint) => sprint.projectId === task.projectId,
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getProjectName(task.projectId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getSprintName(task.sprintId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      task.status === statusFilter

    const matchesPriority =
      priorityFilter === 'All' ||
      task.priority === priorityFilter

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    )
  })

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id)
    setTaskTitle(task.title)
    setTaskDescription(task.description)
    setTaskPriority(task.priority)
    setTaskStatus(task.status)
    setTaskSprintId(task.sprintId)
    setIsTaskModalOpen(true)
  }

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false)
    setEditingTaskId(null)
    setTaskTitle('')
    setTaskDescription('')
    setTaskPriority('Medium')
    setTaskStatus('Todo')
    setTaskSprintId(null)
  }

  const handleTaskSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!taskTitle.trim()) {
      return
    }

    if (editingTaskId !== null) {
      updateTask(
        editingTaskId,
        taskSprintId,
        taskTitle.trim(),
        taskDescription.trim(),
        taskPriority,
        taskStatus,
      )
    }

    handleCloseTaskModal()
  }

  const handleStatusChange = (
    taskId: number,
    status: Task['status'],
  ) => {
    updateTaskStatus(taskId, status)
  }

  const handleDeleteTask = () => {
    if (!taskToDelete) {
      return
    }

    deleteTask(taskToDelete.id)

    setTaskToDelete(null)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('All')
    setPriorityFilter('All')
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tasks
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage all tasks across your workspace.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Total Tasks
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {tasks.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {
              tasks.filter(
                (task) => task.status === 'In Progress',
              ).length
            }
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {
              tasks.filter(
                (task) => task.status === 'Done',
              ).length
            }
          </p>
        </div>

      </section>

      {/* Filters */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">

        <div className="grid gap-3 md:grid-cols-3">

          {/* Search */}
          <div>
            <label
              htmlFor="task-search"
              className="text-xs text-slate-500"
            >
              Search
            </label>

            <input
              id="task-search"
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search tasks..."
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status-filter"
              className="text-xs text-slate-500"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | 'All'
                    | Task['status'],
                )
              }
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
            >
              <option value="All">
                All Statuses
              </option>

              <option value="Todo">
                Todo
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Done">
                Done
              </option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority-filter"
              className="text-xs text-slate-500"
            >
              Priority
            </label>

            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value as
                    | 'All'
                    | Task['priority'],
                )
              }
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
            >
              <option value="All">
                All Priorities
              </option>

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>
            </select>
          </div>

        </div>

      </section>

      {/* Tasks */}
      <section>

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-medium">
              All Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredTasks.length} of {tasks.length} tasks.
            </p>
          </div>

        </div>

        <div className="mt-4 space-y-3">

          {filteredTasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center">

              <p className="text-sm text-slate-500">
                No tasks match your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm text-slate-300 hover:text-white"
              >
                Clear filters
              </button>

            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >

                {/* Task Header */}
                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <h3 className="font-medium text-white">
                      {task.title}
                    </h3>

                    <div className="mt-1 flex flex-wrap gap-2">

                      <span className="text-xs text-slate-600">
                        {getProjectName(task.projectId)}
                      </span>

                      <span className="text-xs text-slate-700">
                        •
                      </span>

                      <span className="text-xs text-slate-600">
                        {getSprintName(task.sprintId)}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {task.description}
                    </p>

                  </div>

                  {/* Status */}
                  <select
                    value={task.status}
                    onChange={(event) =>
                      handleStatusChange(
                        task.id,
                        event.target.value as Task['status'],
                      )
                    }
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs outline-none ${
                      task.status === 'Done'
                        ? 'border-emerald-900 bg-emerald-950 text-emerald-400'
                        : task.status === 'In Progress'
                          ? 'border-blue-900 bg-blue-950 text-blue-400'
                          : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    <option value="Todo">
                      Todo
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Done">
                      Done
                    </option>
                  </select>

                </div>

                {/* Footer */}
                <div className="mt-4 flex items-end justify-between border-t border-slate-800 pt-4">

                  <div>
                    <p className="text-xs text-slate-600">
                      Priority
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        task.priority === 'High'
                          ? 'text-red-400'
                          : task.priority === 'Medium'
                            ? 'text-yellow-400'
                            : 'text-slate-400'
                      }`}
                    >
                      {task.priority}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleEditTask(task)
                      }
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setTaskToDelete(task)
                      }
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </section>

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        editingTaskId={editingTaskId}
        title={taskTitle}
        description={taskDescription}
        priority={taskPriority}
        status={taskStatus}
        sprintId={taskSprintId}
        sprints={
          editingTaskId !== null
            ? getTaskSprints(
                tasks.find(
                  (task) =>
                    task.id === editingTaskId,
                )!,
              )
            : []
        }
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        onPriorityChange={setTaskPriority}
        onStatusChange={setTaskStatus}
        onSprintChange={setTaskSprintId}
        onSubmit={handleTaskSubmit}
        onClose={handleCloseTaskModal}
      />

      {/* Delete Task Dialog */}
      <DeleteTaskDialog
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDeleteTask}
      />

    </div>
  )
}

export default Tasks