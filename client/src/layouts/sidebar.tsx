import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="border-b border-slate-800 p-5">
        <h1 className="text-xl font-semibold tracking-tight">
          HELIX
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Student Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">

        {/* Workspace */}
        <div>
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <div className="mt-1 space-y-1">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              Tasks
            </NavLink>
            <NavLink
  to="/sprints"
  className={({ isActive }) =>
    `block rounded-md px-3 py-2 text-sm transition ${
      isActive
        ? 'bg-slate-800 text-white'
        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
    }`
  }
>
  Sprints
</NavLink>

            <NavLink
              to="/team"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              Team
            </NavLink>

          </div>
        </div>

        {/* Knowledge */}
        <div className="mt-8">
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Knowledge
          </p>

          <div className="mt-1 space-y-1">

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Documents
            </button>

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Notes
            </button>

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Files
            </button>

          </div>
        </div>

        {/* Collaboration */}
        <div className="mt-8">
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Collaboration
          </p>

          <div className="mt-1 space-y-1">

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Chat
            </button>

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Activity
            </button>

          </div>
        </div>

      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-4">
        <p className="text-xs text-slate-500">
          HELIX Workspace
        </p>
      </div>

    </aside>
  )
}

export default Sidebar