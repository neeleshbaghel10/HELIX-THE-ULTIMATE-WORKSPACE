import { Link } from 'react-router-dom'
import type { Project } from '../types/project'

type ProjectCardProps = {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">

      <div className="flex items-start justify-between gap-4">

        <div>
          <Link
            to={`/projects/${project.id}`}
            className="font-medium text-white hover:text-slate-300"
          >
            {project.name}
          </Link>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {project.description}
          </p>
        </div>

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

      <div className="mt-6 flex items-end justify-between border-t border-slate-800 pt-4">

        <div>
          <p className="text-xs text-slate-500">
            Tasks
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {project.tasks}
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(project)}
            className="text-xs text-slate-400 hover:text-white"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(project)}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProjectCard