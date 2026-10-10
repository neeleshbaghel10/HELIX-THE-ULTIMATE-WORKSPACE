import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { FormEvent } from 'react'

import { useSprints } from '../context/SprintContext'
import { useProjects } from '../context/ProjectContext'

import SprintModal from '../components/SprintModal'
import DeleteSprintDialog from '../components/DeleteSprintDialog'

import type { Sprint } from '../types/sprint'

function Sprints() {
  const {
    sprints,
    createSprint,
    updateSprint,
    deleteSprint,
  } = useSprints()

  const { projects } = useProjects()

  const [isSprintModalOpen, setIsSprintModalOpen] =
    useState(false)

  const [editingSprintId, setEditingSprintId] =
    useState<number | null>(null)

  const [sprintProjectId, setSprintProjectId] =
    useState(0)

  const [sprintName, setSprintName] =
    useState('')

  const [sprintGoal, setSprintGoal] =
    useState('')

  const [sprintStatus, setSprintStatus] =
    useState<Sprint['status']>('Planned')

  const [sprintStartDate, setSprintStartDate] =
    useState('')

  const [sprintEndDate, setSprintEndDate] =
    useState('')

  const [sprintToDelete, setSprintToDelete] =
    useState<Sprint | null>(null)

  const getProjectName = (projectId: number) => {
    const project = projects.find(
      (project) => project.id === projectId,
    )

    return project?.name ?? 'Unknown Project'
  }

  const handleCreateSprint = () => {
    setEditingSprintId(null)
    setSprintProjectId(
      projects.length > 0
        ? projects[0].id
        : 0,
    )
    setSprintName('')
    setSprintGoal('')
    setSprintStatus('Planned')
    setSprintStartDate('')
    setSprintEndDate('')
    setIsSprintModalOpen(true)
  }

  const handleEditSprint = (sprint: Sprint) => {
    setEditingSprintId(sprint.id)
    setSprintProjectId(sprint.projectId)
    setSprintName(sprint.name)
    setSprintGoal(sprint.goal)
    setSprintStatus(sprint.status)
    setSprintStartDate(sprint.startDate)
    setSprintEndDate(sprint.endDate)
    setIsSprintModalOpen(true)
  }

  const handleCloseSprintModal = () => {
    setIsSprintModalOpen(false)
    setEditingSprintId(null)
    setSprintProjectId(0)
    setSprintName('')
    setSprintGoal('')
    setSprintStatus('Planned')
    setSprintStartDate('')
    setSprintEndDate('')
  }

  const handleSprintSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!sprintName.trim()) {
      return
    }

    if (!sprintProjectId) {
      return
    }

    if (editingSprintId !== null) {
      updateSprint(
        editingSprintId,
        sprintProjectId,
        sprintName.trim(),
        sprintGoal.trim(),
        sprintStatus,
        sprintStartDate,
        sprintEndDate,
      )
    } else {
      createSprint(
        sprintProjectId,
        sprintName.trim(),
        sprintGoal.trim(),
        sprintStartDate,
        sprintEndDate,
      )
    }

    handleCloseSprintModal()
  }

  const handleDeleteSprint = () => {
    if (!sprintToDelete) {
      return
    }

    deleteSprint(sprintToDelete.id)

    setSprintToDelete(null)
  }

  const handleStatusChange = (
    sprint: Sprint,
    status: Sprint['status'],
  ) => {
    updateSprint(
      sprint.id,
      sprint.projectId,
      sprint.name,
      sprint.goal,
      status,
      sprint.startDate,
      sprint.endDate,
    )
  }

  const activeSprints = sprints.filter(
    (sprint) => sprint.status === 'Active',
  )

  const plannedSprints = sprints.filter(
    (sprint) => sprint.status === 'Planned',
  )

  const completedSprints = sprints.filter(
    (sprint) => sprint.status === 'Completed',
  )

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>

        <div className="flex items-start justify-between gap-4">

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Sprints
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Plan and manage development cycles across your projects.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateSprint}
            className="shrink-0 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
          >
            + New Sprint
          </button>

        </div>

      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-4">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Total Sprints
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {sprints.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Active
          </p>

          <p className="mt-2 text-2xl font-semibold text-blue-400">
            {activeSprints.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Planned
          </p>

          <p className="mt-2 text-2xl font-semibold text-yellow-400">
            {plannedSprints.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold text-emerald-400">
            {completedSprints.length}
          </p>
        </div>

      </section>

      {/* Sprint List */}
      <section>

        <div>
          <h2 className="text-lg font-medium">
            All Sprints
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track sprint goals, timelines, and progress.
          </p>
        </div>

        <div className="mt-4 space-y-3">

          {sprints.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center">

              <p className="text-sm text-slate-500">
                No sprints have been created yet.
              </p>

              <button
                type="button"
                onClick={handleCreateSprint}
                className="mt-4 text-sm text-slate-300 hover:text-white"
              >
                Create your first sprint
              </button>

            </div>
          ) : (
            sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >

                {/* Sprint Header */}
                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-3">

                      <Link
  to={`/sprints/${sprint.id}`}
  className="font-medium text-white hover:text-slate-300"
>
  {sprint.name}
</Link>

                      <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">
                        {getProjectName(sprint.projectId)}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {sprint.goal}
                    </p>

                  </div>

                  {/* Status */}
                  <select
                    value={sprint.status}
                    onChange={(event) =>
                      handleStatusChange(
                        sprint,
                        event.target.value as Sprint['status'],
                      )
                    }
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs outline-none ${
                      sprint.status === 'Completed'
                        ? 'border-emerald-900 bg-emerald-950 text-emerald-400'
                        : sprint.status === 'Active'
                          ? 'border-blue-900 bg-blue-950 text-blue-400'
                          : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
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

                {/* Sprint Footer */}
                <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-slate-800 pt-4">

                  <div className="flex gap-8">

                    <div>
                      <p className="text-xs text-slate-600">
                        Start Date
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {sprint.startDate || 'Not set'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-600">
                        End Date
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {sprint.endDate || 'Not set'}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleEditSprint(sprint)
                      }
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSprintToDelete(sprint)
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

      {/* Sprint Modal */}
      <SprintModal
        isOpen={isSprintModalOpen}
        editingSprintId={editingSprintId}
        projectId={sprintProjectId}
        name={sprintName}
        goal={sprintGoal}
        status={sprintStatus}
        startDate={sprintStartDate}
        endDate={sprintEndDate}
        projects={projects}
        onProjectChange={setSprintProjectId}
        onNameChange={setSprintName}
        onGoalChange={setSprintGoal}
        onStatusChange={setSprintStatus}
        onStartDateChange={setSprintStartDate}
        onEndDateChange={setSprintEndDate}
        onSubmit={handleSprintSubmit}
        onClose={handleCloseSprintModal}
      />

      {/* Delete Dialog */}
      <DeleteSprintDialog
        sprint={sprintToDelete}
        onCancel={() => setSprintToDelete(null)}
        onConfirm={handleDeleteSprint}
      />

    </div>
  )
}

export default Sprints