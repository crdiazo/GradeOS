export const calcularPAPA = (asignaturas) => {
  const conNota = asignaturas.filter(a => a.calificacion !== null && a.calificacion !== undefined)
  const suma = conNota.reduce((acc, a) => acc + a.calificacion * a.creditos, 0)
  const creditos = conNota.reduce((acc, a) => acc + a.creditos, 0)
  return creditos > 0 ? suma / creditos : 0
}

export const calcularPAPPI = (asignaturas) => {
  if (!asignaturas.length) return 0
  const ultimoPeriodo = asignaturas.reduce((max, a) => a.periodo > max ? a.periodo : max, '')
  const delUltimo = asignaturas.filter(a => a.periodo === ultimoPeriodo)
  return calcularPAPA(delUltimo)
}

export const obtenerPeriodos = (asignaturas) => {
  const periodos = [...new Set(asignaturas.map(a => a.periodo))]
  return periodos.sort((a, b) => b.localeCompare(a))
}

export const calcularPorSemestre = (asignaturas) => {
  const periodos = obtenerPeriodos(asignaturas)
  return periodos.map(periodo => ({
    periodo,
    promedio: Number(calcularPAPA(asignaturas.filter(a => a.periodo === periodo)).toFixed(2)),
    creditos: asignaturas
      .filter(a => a.periodo === periodo && a.calificacion !== null)
      .reduce((acc, a) => acc + a.creditos, 0),
    materias: asignaturas.filter(a => a.periodo === periodo).length
  }))
}