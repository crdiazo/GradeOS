import { useState, useEffect } from 'react'
import { calcularPAPA, calcularPAPPI, obtenerPeriodos, calcularPorSemestre } from '../utils/calculator'

const STORAGE_KEY = 'gradeos_asignaturas'

export const useSubjects = () => {
  const [asignaturas, setAsignaturas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(STORAGE_KEY)
      return guardadas ? JSON.parse(guardadas) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(asignaturas))
  }, [asignaturas])

  const agregarAsignatura = (nueva) => {
    const asignatura = {
      id: crypto.randomUUID(),
      nombre: nueva.nombre.trim(),
      creditos: parseInt(nueva.creditos),
      periodo: nueva.periodo.trim(),
      calificacion: nueva.calificacion !== '' ? parseFloat(nueva.calificacion) : null
    }
    setAsignaturas(prev => [...prev, asignatura])
  }

  const editarAsignatura = (id, datos) => {
    setAsignaturas(prev => prev.map(a =>
      a.id === id ? {
        ...a,
        nombre: datos.nombre.trim(),
        creditos: parseInt(datos.creditos),
        periodo: datos.periodo.trim(),
        calificacion: datos.calificacion !== '' ? parseFloat(datos.calificacion) : null
      } : a
    ))
  }

  const eliminarAsignatura = (id) => {
    setAsignaturas(prev => prev.filter(a => a.id !== id))
  }

  const papa = Number(calcularPAPA(asignaturas).toFixed(2))
  const pappi = Number(calcularPAPPI(asignaturas).toFixed(2))
  const periodos = obtenerPeriodos(asignaturas)
  const porSemestre = calcularPorSemestre(asignaturas)
  const creditosAprobados = asignaturas
    .filter(a => a.calificacion !== null && a.calificacion >= 3.0)
    .reduce((acc, a) => acc + a.creditos, 0)

  return {
    asignaturas,
    agregarAsignatura,
    editarAsignatura,
    eliminarAsignatura,
    papa,
    pappi,
    periodos,
    porSemestre,
    creditosAprobados
  }
}