import { motion } from 'framer-motion'
import { Star, Clock, CheckCircle, BookOpen } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, badge, badgeColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
  >
    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
      <Icon size={14} />
      {label}
    </div>
    <div className="text-3xl font-medium text-gray-900 dark:text-white">{value}</div>
    {badge && (
      <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${badgeColor}`}>
        {badge}
      </span>
    )}
  </motion.div>
)

const StatsCards = ({ papa, pappi, creditosAprobados, totalMaterias, ultimoPeriodo }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <StatCard
        icon={Star}
        label="PAPA"
        value={papa || '—'}
        badge={papa > 0 ? 'acumulado' : 'sin datos'}
        badgeColor="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
        delay={0}
      />
      <StatCard
        icon={Clock}
        label="PAPPI"
        value={pappi || '—'}
        badge={ultimoPeriodo || 'sin datos'}
        badgeColor="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
        delay={0.05}
      />
      <StatCard
        icon={CheckCircle}
        label="Créditos aprobados"
        value={creditosAprobados}
        badge="aprobados"
        badgeColor="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        delay={0.1}
      />
      <StatCard
        icon={BookOpen}
        label="Materias"
        value={totalMaterias}
        badge="cursadas"
        badgeColor="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        delay={0.15}
      />
    </div>
  )
}

export default StatsCards