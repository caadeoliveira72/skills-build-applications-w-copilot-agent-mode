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

function Teams({ apiBase }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/teams`)
      .then((response) => response.json())
      .then((payload) => setTeams(normalizeResponse(payload)))
      .catch((err) => setError(err.message || 'Unable to load teams'))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <section>
      <h2>Teams</h2>
      <p>Data is loaded from: <code>{`${apiBase}/teams`}</code></p>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading teams…</div>
      ) : (
        <div className="card-list">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div key={team.id || index} className="resource-card">
                <h3>{team.name || team.title || 'Team'}</h3>
                <p>{team.description || team.members?.length?.toString() || 'No extra details'}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">No teams found.</div>
          )}
        </div>
      )}
    </section>
  )
}

export default Teams
