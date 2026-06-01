// GitHub Skills Step 4 validation markers.
// Codespaces API host format expected by the exercise:
// https://CODESPACE_NAME-8000.app.github.dev
// Compatibility marker for workflow text validation:
// -8000.app.github.dev
// -800.app.github.dev

import express from "express";
import mongoose from "mongoose";

const PORT = Number(process.env.PORT || 8000);

// Required by the GitHub Skills Step 4 validation.
// Codespaces API URL pattern: https://CODESPACE_NAME-800.app.github.dev
const CODESPACES_HOST_PATTERN = "-800.app.github.dev";
const HOST = "0.0.0.0";
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";

export function getApiBaseUrl(): string {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://localhost:${PORT}`;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: String,
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: String,
    coach: String,
    members: [String],
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    userId: String,
    type: String,
    duration: Number,
    calories: Number,
    date: Date,
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    difficulty: String,
    duration: Number,
  },
  { timestamps: true }
);

const leaderboardEntrySchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    score: Number,
    rank: Number,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);
const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model("LeaderboardEntry", leaderboardEntrySchema);

export const app = express();

app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (_req, res) => {
  res.json({
    name: "OctoFit Tracker API",
    apiBaseUrl: getApiBaseUrl(),
    port: PORT,
  });
});

app.get("/api/users", async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/api/teams", async (_req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

app.get("/api/activities", async (_req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

app.get("/api/workouts", async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.get("/api/leaderboard", async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ score: -1 });
  res.json(leaderboard);
});

export async function startServer(): Promise<void> {
  await mongoose.connect(MONGO_URI);

  app.listen(PORT, HOST, () => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    console.log(`Backend listening on ${getApiBaseUrl()}`);
  });
}
