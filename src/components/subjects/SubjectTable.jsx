import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, Search } from 'lucide-react'
import SubjectForm from './SubjectForm'

const gradoColor = (nota) => {
  if (nota === null) return 'text-gray-400 italic'
  if (nota >= 4.0) return 'text-green-600 dark:text-green-400 font-medium'
  if (nota >= 3.0) return 'text-amber-600 dark:text-amber-400 font-medium'
  return 'text-red-600 dark:text-red-400 font-medium'
}

const SubjectTable = ({ asignaturas, periodos, onEditar, onEliminar }) => {
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todas')
  const [editando, setEditando] = useState(null)

  const filtradas = asignaturas.filter(a => {
    const coincideBusqueda = a.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincidePeriodo = filtro === 'Todas' || a.periodo === filtro
    return coincideBusqueda && coincidePeriodo
  })

  return (
    <div>
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar materia..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Todas', ...periodos].map(p => (
            <button
              key={p}
              onClick={() => setFiltro(p)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                filtro === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Materia</th>
              <th className="text-left px-4 py-3">Semestre</th>
              <th className="text-left px-4 py-3">Créditos</th>
              <th className="text-left px-4 py-3">Nota</th>
              <th className="text-left px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">
                    No hay materias registradas
                  </td>
                </tr>
              ) : (
                filtradas.map(a => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{a.nombre}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                        {a.periodo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.creditos}</td>
                    <td className={`px-4 py-3 ${gradoColor(a.calificacion)}`}>
                      {a.calificacion !== null ? a.calificacion.toFixed(1) : 'Sin nota'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditando(a)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-purple-600 hover:border-purple-300 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => onEliminar(a.id)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {editando && (
        <SubjectForm
          inicial={editando}
          onGuardar={(datos) => { onEditar(editando.id, datos); setEditando(null) }}
          onCerrar={() => setEditando(null)}
        />
      )}
    </div>
  )
}

export default SubjectTable