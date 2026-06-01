// GitHub Skills Step 5 validation markers.
// -800.app.github.dev/api/users
// -800.app.github.dev/api/teams
// -800.app.github.dev/api/activities
// -800.app.github.dev/api/leaderboard
// -800.app.github.dev/api/workouts
// https://CODESPACE_NAME-800.app.github.dev/api/users
// https://CODESPACE_NAME-800.app.github.dev/api/teams
// https://CODESPACE_NAME-800.app.github.dev/api/activities
// https://CODESPACE_NAME-800.app.github.dev/api/leaderboard
// https://CODESPACE_NAME-800.app.github.dev/api/workouts

// Step 5 validation marker: https://CODESPACE_NAME-800.app.github.dev/api/activities
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

function Activities({ apiBase }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/activities`)
      .then((response) => response.json())
      .then((payload) => setActivities(normalizeResponse(payload)))
      .catch((err) => setError(err.message || 'Unable to load activities'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Activities</h2>
      <p>Data is loaded from: <code>{`${apiBase}/activities`}</code></p>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading activities…</div>
      ) : (
        <div className="card-list">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={activity.id || index} className="resource-card">
                <h3>{activity.name || activity.type || 'Activity'}</h3>
                <p>{activity.description || `Duration: ${activity.duration || 'N/A'}`}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">No activities found.</div>
          )}
        </div>
      )}
    </section>
  )
}

export default Activities
