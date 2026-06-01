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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
