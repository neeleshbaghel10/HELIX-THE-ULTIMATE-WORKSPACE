import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import DeleteProjectDialog from '../components/DeleteProjectDialog'
import { useProjects } from '../context/ProjectContext.tsx'
import type { Project } from '../types/project'

function Projects() {
  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [editingProjectId, setEditingProjectId] =
    useState<number | null>(null)

  const [projectToDelete, setProjectToDelete] =
    useState<Project | null>(null)

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!name.trim()) {
      return
    }

    if (editingProjectId !== null) {
      updateProject(
        editingProjectId,
        name.trim(),
        description.trim(),
      )
    } else {
      createProject(
        name.trim(),
        description.trim(),
      )
    }

    handleCloseModal()
  }

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id)
    setName(project.name)
    setDescription(project.description)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProjectId(null)
    setName('')
    setDescription('')
  }

  const handleCreateProject = () => {
    setEditingProjectId(null)
    setName('')
    setDescription('')
    setIsModalOpen(true)
  }

  const handleDeleteProject = () => {
    if (!projectToDelete) {
      return
    }

    deleteProject(projectToDelete.id)
    setProjectToDelete(null)
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <section>
        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Projects
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage your projects and keep your team aligned.
            </p>
          </div>

          <button
            onClick={handleCreateProject}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            + New Project
          </button>

        </div>
      </section>

      {/* Projects List */}
      <section>
        <h2 className="mb-4 text-sm font-medium text-slate-300">
          Your projects
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={setProjectToDelete}
            />
          ))}

        </div>
      </section>

      {/* Create / Edit Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        editingProjectId={editingProjectId}
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />

      {/* Delete Confirmation */}
      <DeleteProjectDialog
        project={projectToDelete}
        onCancel={() => setProjectToDelete(null)}
        onConfirm={handleDeleteProject}
      />

    </div>
  )
}

export default Projects