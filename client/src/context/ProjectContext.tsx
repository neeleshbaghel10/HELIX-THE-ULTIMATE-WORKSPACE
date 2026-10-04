import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { Project } from '../types/project'

type ProjectContextType = {
  projects: Project[]
  createProject: (name: string, description: string) => void
  updateProject: (
    id: number,
    name: string,
    description: string,
  ) => void
  deleteProject: (id: number) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined,
)

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'HELIX',
    description: 'The ultimate workspace for student software teams.',
    tasks: 12,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'Personal developer portfolio and projects.',
    tasks: 8,
    status: 'Active',
  },
  {
    id: 3,
    name: 'College Management System',
    description: 'A system for managing college activities.',
    tasks: 24,
    status: 'Completed',
  },
]

type ProjectProviderProps = {
  children: ReactNode
}

export function ProjectProvider({
  children,
}: ProjectProviderProps) {
  const [projects, setProjects] =
    useState<Project[]>(initialProjects)

  const createProject = (
    name: string,
    description: string,
  ) => {
    const newProject: Project = {
      id: Date.now(),
      name,
      description,
      tasks: 0,
      status: 'Active',
    }

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ])
  }

  const updateProject = (
    id: number,
    name: string,
    description: string,
  ) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id
          ? {
              ...project,
              name,
              description,
            }
          : project,
      ),
    )
  }

  const deleteProject = (id: number) => {
    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== id,
      ),
    )
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error(
      'useProjects must be used inside ProjectProvider',
    )
  }

  return context
}