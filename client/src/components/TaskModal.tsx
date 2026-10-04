import type { FormEvent } from 'react'
import type { Task } from '../types/task'

type TaskModalProps = {
  isOpen: boolean
  editingTaskId: number | null
  title: string
  description: string
  priority: Task['priority']
  status: Task['status']

  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onPriorityChange: (value: Task['priority']) => void
  onStatusChange: (value: Task['status']) => void

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void

  onClose: () => void
}

function TaskModal({
  isOpen,
  editingTaskId,
  title,
  description,
  priority,
  status,
  onTitleChange,
  onDescriptionChange,
  onPriorityChange,
  onStatusChange,
  onSubmit,
  onClose,
}: TaskModalProps) {
  if (!isOpen) {
    return null
  }

  const isEditing = editingTaskId !== null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-lg font-semibold text-white">
              {isEditing
                ? 'Edit Task'
                : 'Create Task'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? 'Update the task details.'
                : 'Add a new task to this project.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-5"
        >

          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="text-sm text-slate-300"
            >
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) =>
                onTitleChange(event.target.value)
              }
              placeholder="e.g. Build login page"
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="text-sm text-slate-300"
            >
              Description
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) =>
                onDescriptionChange(event.target.value)
              }
              placeholder="What needs to be done?"
              rows={4}
              className="mt-2 w-full resize-none rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="task-priority"
              className="text-sm text-slate-300"
            >
              Priority
            </label>

            <select
              id="task-priority"
              value={priority}
              onChange={(event) =>
                onPriorityChange(
                  event.target.value as Task['priority'],
                )
              }
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
            >
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

          {/* Status */}
          {isEditing && (
            <div>
              <label
                htmlFor="task-status"
                className="text-sm text-slate-300"
              >
                Status
              </label>

              <select
                id="task-status"
                value={status}
                onChange={(event) =>
                  onStatusChange(
                    event.target.value as Task['status'],
                  )
                }
                className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
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
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
            >
              {isEditing
                ? 'Save Changes'
                : 'Create Task'}
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default TaskModal