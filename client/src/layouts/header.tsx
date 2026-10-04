function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      
      <div>
        <h2 className="text-sm font-medium text-white">
          Overview
        </h2>

        <p className="text-xs text-slate-500">
          Welcome back to HELIX
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-400 hover:text-white">
          Search
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-medium">
          N
        </button>
      </div>

    </header>
  )
}

export default Header