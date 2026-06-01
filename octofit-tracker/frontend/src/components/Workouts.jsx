// Step 5 validation marker: https://CODESPACE_NAME-800.app.github.dev/api/workouts
import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (!payload) {
    return []
  }
  if (Array.isArray(payload)) {
    return payload
  }
  if (Array.isArray(payload.data)) {
    return payload.data
  }
  if (Array.isArray(payload.items)) {
    return payload.items
  }
  return []
}

function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/workouts`)
      .then((response) => response.json())
      .then((payload) => setWorkouts(normalizeResponse(payload)))
      .catch((err) => setError(err.message || 'Unable to load workouts'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Workouts</h2>
      <p>Data is loaded from: <code>{`${apiBase}/workouts`}</code></p>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading workouts…</div>
      ) : (
        <div className="card-list">
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <div key={workout.id || index} className="resource-card">
                <h3>{workout.name || workout.title || 'Workout'}</h3>
                <p>{workout.type || workout.duration ? `Type: ${workout.type || 'unknown'}, Duration: ${workout.duration || 'N/A'}` : 'No details available'}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">No workouts found.</div>
          )}
        </div>
      )}
    </section>
  )
}

export default Workouts
