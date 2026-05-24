import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const initialState = { nombre: '', creditos: '', periodo: '', calificacion: '' }

const SubjectForm = ({ onGuardar, onCerrar, inicial = null }) => {
  const [form, setForm] = useState(inicial || initialState)
  const [errores, setErrores] = useState({})

  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!form.creditos || parseInt(form.creditos) <= 0) e.creditos = 'Créditos deben ser positivos'
    if (!form.periodo.trim()) e.periodo = 'El periodo es obligatorio'
    if (form.calificacion !== '' && (parseFloat(form.calificacion) < 0 || parseFloat(form.calificacion) > 5))
      e.calificacion = 'La nota debe estar entre 0.0 y 5.0'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validar()) return
    onGuardar(form)
    onCerrar()
  }

  const campo = (key, label, placeholder, type = 'text') => (
    <div>
      <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {errores[key] && <p className="text-xs text-red-500 mt-1">{errores[key]}</p>}
    </div>
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        onClick={onCerrar}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">
              {inicial ? 'Editar materia' : 'Agregar materia'}
            </h2>
            <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {campo('nombre', 'Nombre', 'Ej: Cálculo diferencial')}
            <div className="grid grid-cols-2 gap-3">
              {campo('creditos', 'Créditos', 'Ej: 4', 'number')}
              {campo('periodo', 'Periodo', 'Ej: 2025-1')}
            </div>
            {campo('calificacion', 'Calificación (opcional)', 'Ej: 3.8', 'number')}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCerrar}
              className="flex-1 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 text-sm rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
            >
              {inicial ? 'Guardar cambios' : 'Agregar'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SubjectForm