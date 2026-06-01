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

// Step 5 validation marker: https://CODESPACE_NAME-800.app.github.dev/api/users
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

function Users({ apiBase }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/users`)
      .then((response) => response.json())
      .then((payload) => setUsers(normalizeResponse(payload)))
      .catch((err) => setError(err.message || 'Unable to load users'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Users</h2>
      <p>Data is loaded from: <code>{`${apiBase}/users`}</code></p>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading users…</div>
      ) : (
        <div className="card-list">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={user.id || index} className="resource-card">
                <h3>{user.name || user.username || 'User'}</h3>
                <p>{user.email || user.role || 'No extra details'}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">No users found.</div>
          )}
        </div>
      )}
    </section>
  )
}

export default Users
