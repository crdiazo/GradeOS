import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm shadow">
        <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
        <p className="text-purple-600 dark:text-purple-400">Promedio: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

const SemesterChart = ({ porSemestre }) => {
  if (!porSemestre.length) return null

  const data = [...porSemestre].reverse()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Promedio por semestre
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data}>
            <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="promedio" fill="#7c3aed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Tendencia PAPA
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="promedio"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={{ fill: '#7c3aed', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SemesterChart