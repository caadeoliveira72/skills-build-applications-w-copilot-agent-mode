import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiBase = `${apiHost}/api`
const envNote = codespaceName
  ? `Connected to Codespaces API host ${apiHost}`
  : 'VITE_CODESPACE_NAME is not defined. Using http://localhost:8000 as a safe fallback. Define VITE_CODESPACE_NAME in .env.local to use the Codespaces URL.'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>OctoFit Tracker</h1>
          <p className="app-note">
            {envNote}
            <br />
            Example: <code>VITE_CODESPACE_NAME=your-codespace-name</code> in <code>.env.local</code>
          </p>
        </header>

        <nav className="app-nav">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/users">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/teams">
            Teams
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/activities">
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/workouts">
            Workouts
          </NavLink>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Users apiBase={apiBase} />} />
            <Route path="/users" element={<Users apiBase={apiBase} />} />
            <Route path="/teams" element={<Teams apiBase={apiBase} />} />
            <Route path="/activities" element={<Activities apiBase={apiBase} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
            <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
            <Route path="*" element={<Users apiBase={apiBase} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
