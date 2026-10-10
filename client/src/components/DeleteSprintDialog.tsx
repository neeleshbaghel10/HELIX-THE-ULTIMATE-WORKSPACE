import type { Sprint } from '../types/sprint'

type DeleteSprintDialogProps = {
  sprint: Sprint | null
  onCancel: () => void
  onConfirm: () => void
}

function DeleteSprintDialog({
  sprint,
  onCancel,
  onConfirm,
}: DeleteSprintDialogProps) {
  if (!sprint) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-xl">

        <h2 className="text-lg font-semibold text-white">
          Delete Sprint?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Are you sure you want to delete{' '}
          <span className="font-medium text-white">
            {sprint.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Delete Sprint
          </button>

        </div>

      </div>
    </div>
  )
}

export default DeleteSprintDialog