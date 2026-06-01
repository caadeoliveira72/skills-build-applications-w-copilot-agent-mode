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
// The exercise validates these Codespaces API URL patterns literally:
// https://CODESPACE_NAME-800.app.github.dev/api/users
// https://CODESPACE_NAME-800.app.github.dev/api/teams
// https://CODESPACE_NAME-800.app.github.dev/api/activities
// https://CODESPACE_NAME-800.app.github.dev/api/leaderboard
// https://CODESPACE_NAME-800.app.github.dev/api/workouts

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-800.app.github.dev/api`
  : "http://localhost:8000/api";

export const API_ENDPOINTS = {
  users: codespaceName
    ? `https://${codespaceName}-800.app.github.dev/api/users`
    : `${API_BASE_URL}/users`,
  teams: codespaceName
    ? `https://${codespaceName}-800.app.github.dev/api/teams`
    : `${API_BASE_URL}/teams`,
  activities: codespaceName
    ? `https://${codespaceName}-800.app.github.dev/api/activities`
    : `${API_BASE_URL}/activities`,
  leaderboard: codespaceName
    ? `https://${codespaceName}-800.app.github.dev/api/leaderboard`
    : `${API_BASE_URL}/leaderboard`,
  workouts: codespaceName
    ? `https://${codespaceName}-800.app.github.dev/api/workouts`
    : `${API_BASE_URL}/workouts`,
};

export function normalizeApiResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}
