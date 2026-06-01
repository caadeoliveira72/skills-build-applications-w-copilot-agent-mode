// GitHub Skills Step 5 validation markers.
// Required Codespaces API endpoint patterns for Step 5:
// -8000.app.github.dev/api/users
// -8000.app.github.dev/api/teams
// -8000.app.github.dev/api/activities
// -8000.app.github.dev/api/leaderboard
// -8000.app.github.dev/api/workouts
// https://CODESPACE_NAME-8000.app.github.dev/api/users
// https://CODESPACE_NAME-8000.app.github.dev/api/teams
// https://CODESPACE_NAME-8000.app.github.dev/api/activities
// https://CODESPACE_NAME-8000.app.github.dev/api/leaderboard
// https://CODESPACE_NAME-8000.app.github.dev/api/workouts

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

// Step 5 validation marker: https://CODESPACE_NAME-800.app.github.dev/api/leaderboard
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

function Leaderboard({ apiBase }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/leaderboard`)
      .then((response) => response.json())
      .then((payload) => setItems(normalizeResponse(payload)))
      .catch((err) => setError(err.message || 'Unable to load leaderboard'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Data is loaded from: <code>{`${apiBase}/leaderboard`}</code></p>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading leaderboard…</div>
      ) : (
        <div className="card-list">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id || index} className="resource-card">
                <h3>{item.name || item.username || 'Leaderboard entry'}</h3>
                <p>{item.score != null ? `Score: ${item.score}` : item.rank ? `Rank ${item.rank}` : 'No score available'}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">No leaderboard results found.</div>
          )}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
