import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useSubjects } from './hooks/useSubjects'
import StatsCards from './components/stats/StatsCards'
import SubjectTable from './components/subjects/SubjectTable'
import SubjectForm from './components/subjects/SubjectForm'
import SemesterChart from './components/charts/SemesterChart'
import Sidebar from './components/layout/Sidebar'

function App() {
  const [mostrarForm, setMostrarForm] = useState(false)
  const {
    asignaturas,
    agregarAsignatura,
    editarAsignatura,
    eliminarAsignatura,
    papa,
    pappi,
    periodos,
    porSemestre,
    creditosAprobados
  } = useSubjects()

  const ultimoPeriodo = periodos[0] || null

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden">
      <Sidebar periodos={periodos} />

      <main className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-xl font-medium text-gray-900 dark:text-white">
                Panel académico
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Calcula tu PAPA y PAPPI automáticamente
              </p>
            </div>
            <button
              onClick={() => setMostrarForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={16} />
              Agregar materia
            </button>
          </div>

          {/* Tarjetas de estadísticas */}
          <StatsCards
            papa={papa}
            pappi={pappi}
            creditosAprobados={creditosAprobados}
            totalMaterias={asignaturas.length}
            ultimoPeriodo={ultimoPeriodo}
          />

          {/* Tabla de materias */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                Materias
              </h2>
              <span className="text-xs text-gray-400">
                {asignaturas.length} registradas
              </span>
            </div>
            <SubjectTable
              asignaturas={asignaturas}
              periodos={periodos}
              onEditar={editarAsignatura}
              onEliminar={eliminarAsignatura}
            />
          </div>

          {/* Gráficas */}
          <SemesterChart porSemestre={porSemestre} />
        </motion.div>
      </main>

      {mostrarForm && (
        <SubjectForm
          onGuardar={agregarAsignatura}
          onCerrar={() => setMostrarForm(false)}
        />
      )}
    </div>
  )
}

export default App