import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { Sprint } from '../types/sprint'

type SprintContextType = {
  sprints: Sprint[]

  createSprint: (
    projectId: number,
    name: string,
    goal: string,
    startDate: string,
    endDate: string,
  ) => void

  updateSprint: (
    id: number,
    projectId: number,
    name: string,
    goal: string,
    status: Sprint['status'],
    startDate: string,
    endDate: string,
  ) => void

  deleteSprint: (id: number) => void
}

const SprintContext = createContext<
  SprintContextType | undefined
>(undefined)

const initialSprints: Sprint[] = [
  {
    id: 1,
    projectId: 1,
    name: 'Foundation Sprint',
    goal: 'Build the initial HELIX architecture and core task system.',
    status: 'Active',
    startDate: '2026-10-01',
    endDate: '2026-10-14',
  },
  {
    id: 2,
    projectId: 1,
    name: 'Workspace Sprint',
    goal: 'Build projects, tasks, and workspace management.',
    status: 'Planned',
    startDate: '2026-10-15',
    endDate: '2026-10-28',
  },
  {
    id: 3,
    projectId: 2,
    name: 'Portfolio Sprint',
    goal: 'Complete the main portfolio experience.',
    status: 'Completed',
    startDate: '2026-09-01',
    endDate: '2026-09-14',
  },
]

type SprintProviderProps = {
  children: ReactNode
}

export function SprintProvider({
  children,
}: SprintProviderProps) {
  const [sprints, setSprints] =
    useState<Sprint[]>(initialSprints)

  const createSprint = (
    projectId: number,
    name: string,
    goal: string,
    startDate: string,
    endDate: string,
  ) => {
    const newSprint: Sprint = {
      id: Date.now(),
      projectId,
      name,
      goal,
      status: 'Planned',
      startDate,
      endDate,
    }

    setSprints((currentSprints) => [
      ...currentSprints,
      newSprint,
    ])
  }

  const updateSprint = (
    id: number,
    projectId: number,
    name: string,
    goal: string,
    status: Sprint['status'],
    startDate: string,
    endDate: string,
  ) => {
    setSprints((currentSprints) =>
      currentSprints.map((sprint) =>
        sprint.id === id
          ? {
              ...sprint,
              projectId,
              name,
              goal,
              status,
              startDate,
              endDate,
            }
          : sprint,
      ),
    )
  }

  const deleteSprint = (id: number) => {
    setSprints((currentSprints) =>
      currentSprints.filter(
        (sprint) => sprint.id !== id,
      ),
    )
  }

  return (
    <SprintContext.Provider
      value={{
        sprints,
        createSprint,
        updateSprint,
        deleteSprint,
      }}
    >
      {children}
    </SprintContext.Provider>
  )
}

export function useSprints() {
  const context = useContext(SprintContext)

  if (!context) {
    throw new Error(
      'useSprints must be used inside SprintProvider',
    )
  }

  return context
}