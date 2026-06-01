import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    apiBaseUrl,
    message: 'OctoFit Tracker backend is running',
    routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

const usersRouter = express.Router();
usersRouter.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});
usersRouter.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});
app.use('/api/users', usersRouter);

const teamsRouter = express.Router();
teamsRouter.get('/', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json(teams);
});
teamsRouter.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});
app.use('/api/teams', teamsRouter);

const activitiesRouter = express.Router();
activitiesRouter.get('/', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json(activities);
});
activitiesRouter.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});
app.use('/api/activities', activitiesRouter);

const workoutsRouter = express.Router();
workoutsRouter.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});
workoutsRouter.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});
app.use('/api/workouts', workoutsRouter);

const leaderboardRouter = express.Router();
leaderboardRouter.get('/', async (_req, res) => {
  const entries = await LeaderboardEntry.find().sort({ score: -1 }).lean();
  res.json(entries);
});
leaderboardRouter.post('/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});
app.use('/api/leaderboard', leaderboardRouter);

mongoose.set('strictQuery', false);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri}`);
    app.listen(port, () => {
      console.log(`Backend listening on ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
