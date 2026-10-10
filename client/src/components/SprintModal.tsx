import type { FormEvent } from 'react'
import type { Sprint } from '../types/sprint'
import type { Project } from '../types/project'

type SprintModalProps = {
  isOpen: boolean
  editingSprintId: number | null

  projectId: number
  name: string
  goal: string
  status: Sprint['status']
  startDate: string
  endDate: string

  projects: Project[]

  onProjectChange: (value: number) => void
  onNameChange: (value: string) => void
  onGoalChange: (value: string) => void
  onStatusChange: (value: Sprint['status']) => void
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void

  onClose: () => void
}

function SprintModal({
  isOpen,
  editingSprintId,
  projectId,
  name,
  goal,
  status,
  startDate,
  endDate,
  projects,
  onProjectChange,
  onNameChange,
  onGoalChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  onClose,
}: SprintModalProps) {
  if (!isOpen) {
    return null
  }

  const isEditing = editingSprintId !== null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-lg font-semibold text-white">
              {isEditing
                ? 'Edit Sprint'
                : 'Create Sprint'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? 'Update the sprint details.'
                : 'Create a new sprint for your project.'}
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

          {/* Project */}
          <div>
            <label
              htmlFor="sprint-project"
              className="text-sm text-slate-300"
            >
              Project
            </label>

            <select
              id="sprint-project"
              value={projectId}
              onChange={(event) =>
                onProjectChange(
                  Number(event.target.value),
                )
              }
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
            >
              <option value={0}>
                Select a project
              </option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sprint Name */}
          <div>
            <label
              htmlFor="sprint-name"
              className="text-sm text-slate-300"
            >
              Sprint name
            </label>

            <input
              id="sprint-name"
              type="text"
              value={name}
              onChange={(event) =>
                onNameChange(event.target.value)
              }
              placeholder="e.g. Authentication Sprint"
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

          {/* Goal */}
          <div>
            <label
              htmlFor="sprint-goal"
              className="text-sm text-slate-300"
            >
              Sprint goal
            </label>

            <textarea
              id="sprint-goal"
              value={goal}
              onChange={(event) =>
                onGoalChange(event.target.value)
              }
              placeholder="What should this sprint accomplish?"
              rows={3}
              className="mt-2 w-full resize-none rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

          {/* Status */}
          {isEditing && (
            <div>
              <label
                htmlFor="sprint-status"
                className="text-sm text-slate-300"
              >
                Status
              </label>

              <select
                id="sprint-status"
                value={status}
                onChange={(event) =>
                  onStatusChange(
                    event.target.value as Sprint['status'],
                  )
                }
                className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
              >
                <option value="Planned">
                  Planned
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>
          )}

          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label
                htmlFor="sprint-start-date"
                className="text-sm text-slate-300"
              >
                Start date
              </label>

              <input
                id="sprint-start-date"
                type="date"
                value={startDate}
                onChange={(event) =>
                  onStartDateChange(
                    event.target.value,
                  )
                }
                className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label
                htmlFor="sprint-end-date"
                className="text-sm text-slate-300"
              >
                End date
              </label>

              <input
                id="sprint-end-date"
                type="date"
                value={endDate}
                onChange={(event) =>
                  onEndDateChange(
                    event.target.value,
                  )
                }
                className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-600"
              />
            </div>

          </div>

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
                : 'Create Sprint'}
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default SprintModal