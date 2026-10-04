function Home() {
  return (
    <div className="space-y-8">

      {/* Page heading */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">
          Overview
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Your workspace at a glance.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Projects
          </p>

          <p className="mt-2 text-2xl font-semibold">
            0
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Tasks
          </p>

          <p className="mt-2 text-2xl font-semibold">
            0
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Team Members
          </p>

          <p className="mt-2 text-2xl font-semibold">
            0
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Active Sprint
          </p>

          <p className="mt-2 text-2xl font-semibold">
            —
          </p>
        </div>

      </section>

      {/* Empty state */}
      <section className="rounded-lg border border-dashed border-slate-800 bg-slate-900/50 p-10 text-center">
        <h2 className="text-lg font-medium">
          Your workspace is empty
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Create your first project to get started with HELIX.
        </p>

        <button className="mt-5 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200">
          Create Project
        </button>
      </section>

    </div>
  )
}

export default Home