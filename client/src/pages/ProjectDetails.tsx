import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useProjects } from '../context/ProjectContext'
import { useTasks } from '../context/TaskContext'

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
    deleteTask,
  } = useTasks()

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

  const completedTasks = projectTasks.filter(
    (task) => task.status === 'Done',
  )

  const handleCreateTask = () => {
    setEditingTaskId(null)
    setTaskTitle('')
    setTaskDescription('')
    setTaskPriority('Medium')
    setTaskStatus('Todo')
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id)
    setTaskTitle(task.title)
    setTaskDescription(task.description)
    setTaskPriority(task.priority)
    setTaskStatus(task.status)
    setIsTaskModalOpen(true)
  }

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false)
    setEditingTaskId(null)
    setTaskTitle('')
    setTaskDescription('')
    setTaskPriority('Medium')
    setTaskStatus('Todo')
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
        taskTitle.trim(),
        taskDescription.trim(),
        taskPriority,
        taskStatus,
      )
    } else {
      createTask(
        project.id,
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
            Sprint
          </p>

          <p className="mt-2 text-2xl font-semibold">
            —
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

                  <div>
                    <h3 className="font-medium text-white">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {task.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs ${
                      task.status === 'Done'
                        ? 'bg-emerald-950 text-emerald-400'
                        : task.status === 'In Progress'
                          ? 'bg-blue-950 text-blue-400'
                          : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {task.status}
                  </span>

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

      {/* Other Workspace Sections */}
      <section className="grid gap-4 md:grid-cols-3">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-medium">
            Sprints
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Plan and manage your development sprints.
          </p>
        </div>

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
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        onPriorityChange={setTaskPriority}
        onStatusChange={setTaskStatus}
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