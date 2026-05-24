import { LayoutDashboard, BookOpen, TrendingUp, Calendar } from 'lucide-react'

const Sidebar = ({ periodos }) => {
  return (
    <aside className="w-52 shrink-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-purple-600" />
        <span className="text-base font-medium text-gray-900 dark:text-white">GradeOS</span>
      </div>

      <nav className="flex flex-col gap-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white">
          <LayoutDashboard size={15} />
          Panel
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <BookOpen size={15} />
          Materias
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 cursor-pointer">
          <TrendingUp size={15} />
          Progreso
        </div>
      </nav>

      {periodos.length > 0 && (
        <>
          <p className="text-xs text-gray-400 uppercase tracking-widest px-3 mt-5 mb-2">
            Semestres
          </p>
          <div className="flex flex-col gap-1">
            {periodos.map(p => (
              <div
                key={p}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 cursor-pointer"
              >
                <Calendar size={14} />
                {p}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  )
}

export default Sidebar