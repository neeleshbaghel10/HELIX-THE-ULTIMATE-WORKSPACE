import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useProjects } from '../context/ProjectContext'
import { useTasks } from '../context/TaskContext'
import { useSprints } from '../context/SprintContext'

import TaskModal from '../components/TaskModal'
import DeleteTaskDialog from '../components/DeleteTaskDialog'

import type { Task } from '../types/task'

function ProjectDetails() {
  const { projectId } = useParams()

  const { projects } = useProjects()

  const {
    tasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks()

  const { sprints } = useSprints()

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

  const project = projects.find(
    (project) => project.id === Number(projectId),
  )

  if (!project) {
    return (
      <div className="space-y-6">

        <h1 className="text-2xl font-semibold">
          Project not found
        </h1>

        <p className="text-sm text-slate-400">
          The project you're looking for doesn't exist.
        </p>

        <Link
          to="/projects"
          className="inline-block text-sm text-slate-300 hover:text-white"
        >
          ← Back to Projects
        </Link>

      </div>
    )
  }

  const projectTasks = tasks.filter(
    (task) => task.projectId === project.id,
  )

  const projectSprints = sprints.filter(
    (sprint) => sprint.projectId === project.id,
  )

  const completedTasks = projectTasks.filter(
    (task) => task.status === 'Done',
  )

  const handleCreateTask = () => {
    setEditingTaskId(null)
    setTaskTitle('')
    setTaskDescription('')
    setTaskPriority('Medium')
    setTaskStatus('Todo')
    setTaskSprintId(null)
    setIsTaskModalOpen(true)
  }

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
    } else {
      createTask(
        project.id,
        taskSprintId,
        taskTitle.trim(),
        taskDescription.trim(),
        taskPriority,
      )
    }

    handleCloseTaskModal()
  }

  const handleDeleteTask = () => {
    if (!taskToDelete) {
      return
    }

    deleteTask(taskToDelete.id)

    setTaskToDelete(null)
  }

  const handleStatusChange = (
    taskId: number,
    status: Task['status'],
  ) => {
    updateTaskStatus(taskId, status)
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

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>

        <Link
          to="/projects"
          className="text-sm text-slate-500 hover:text-white"
        >
          ← Back to Projects
        </Link>

        <div className="mt-6">

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-semibold tracking-tight">
              {project.name}
            </h1>

            <span
              className={`rounded-full px-2 py-1 text-xs ${
                project.status === 'Active'
                  ? 'bg-emerald-950 text-emerald-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {project.status}
            </span>

          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {project.description}
          </p>

        </div>

      </section>

      {/* Project Stats */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Tasks
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {projectTasks.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {completedTasks.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Sprints
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {projectSprints.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Members
          </p>

          <p className="mt-2 text-2xl font-semibold">
            0
          </p>
        </div>

      </section>

      {/* Tasks */}
      <section>

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-medium">
              Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage development tasks for this project.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateTask}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
          >
            + New Task
          </button>

        </div>

        <div className="mt-4 space-y-3">

          {projectTasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center">

              <p className="text-sm text-slate-500">
                No tasks have been created for this project yet.
              </p>

            </div>
          ) : (
            projectTasks.map((task) => (
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

                    <p className="mt-1 text-xs text-slate-600">
                      {getSprintName(task.sprintId)}
                    </p>

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

                {/* Task Footer */}
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

      {/* Project Sprints */}
      <section>

        <div>
          <h2 className="text-lg font-medium">
            Sprints
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Development cycles for this project.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">

          {projectSprints.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-800 bg-slate-900/50 p-6 text-center md:col-span-2">

              <p className="text-sm text-slate-500">
                No sprints have been created for this project.
              </p>

            </div>
          ) : (
            projectSprints.map((sprint) => (
              <div
                key={sprint.id}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >

                <div className="flex items-start justify-between gap-3">

                  <h3 className="font-medium text-white">
                    {sprint.name}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      sprint.status === 'Completed'
                        ? 'bg-emerald-950 text-emerald-400'
                        : sprint.status === 'Active'
                          ? 'bg-blue-950 text-blue-400'
                          : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {sprint.status}
                  </span>

                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {sprint.goal}
                </p>

                <p className="mt-4 text-xs text-slate-600">
                  {sprint.startDate} → {sprint.endDate}
                </p>

              </div>
            ))
          )}

        </div>

      </section>

      {/* Other Workspace Sections */}
      <section className="grid gap-4 md:grid-cols-2">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-medium">
            Documentation
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Store technical documentation and project knowledge.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-medium">
            Team
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            See project members and collaboration activity.
          </p>
        </div>

      </section>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        editingTaskId={editingTaskId}
        title={taskTitle}
        description={taskDescription}
        priority={taskPriority}
        status={taskStatus}
        sprintId={taskSprintId}
        sprints={projectSprints}
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        onPriorityChange={setTaskPriority}
        onStatusChange={setTaskStatus}
        onSprintChange={setTaskSprintId}
        onSubmit={handleTaskSubmit}
        onClose={handleCloseTaskModal}
      />

      {/* Delete Task Confirmation */}
      <DeleteTaskDialog
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDeleteTask}
      />

    </div>
  )
}

export default ProjectDetails