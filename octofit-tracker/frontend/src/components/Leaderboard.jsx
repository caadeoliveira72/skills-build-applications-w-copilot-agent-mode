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
