type ProjectModalProps = {
  isOpen: boolean
  editingProjectId: number | null
  name: string
  description: string
  onNameChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onClose: () => void
}

function ProjectModal({
  isOpen,
  editingProjectId,
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onSubmit,
  onClose,
}: ProjectModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-xl">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-lg font-semibold">
              {editingProjectId !== null
                ? 'Edit Project'
                : 'Create Project'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {editingProjectId !== null
                ? 'Update your project details.'
                : 'Add a new project to your workspace.'}
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

        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-5"
        >

          <div>
            <label className="text-sm text-slate-300">
              Project name
            </label>

            <input
              value={name}
              onChange={(event) =>
                onNameChange(event.target.value)
              }
              placeholder="e.g. HELIX"
              className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                onDescriptionChange(event.target.value)
              }
              placeholder="What is this project about?"
              rows={4}
              className="mt-2 w-full resize-none rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
            />
          </div>

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
              {editingProjectId !== null
                ? 'Save Changes'
                : 'Create Project'}
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default ProjectModal