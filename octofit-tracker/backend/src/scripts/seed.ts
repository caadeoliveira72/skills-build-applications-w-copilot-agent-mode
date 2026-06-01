/*
Seed the octofit_db database with test data
*/
import mongoose from 'mongoose';
import { User, Team, Activity, Workout, LeaderboardEntry } from '../models.js';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function main() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}`);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  // Create teams
  const teams = await Team.create([
    { name: 'Mariners', description: 'Casual morning runners' },
    { name: 'OctoSprinters', description: 'Sprint-focused competitive team' },
    { name: 'Zen Yogis', description: 'Yoga and mobility enthusiasts' },
  ]);

  // Create users and assign to teams
  const users = await User.create([
    { name: 'Ava Thompson', email: 'ava@example.com', teamId: teams[0]._id.toString(), profile: 'Enjoys trail runs' },
    { name: 'Liam Chen', email: 'liam@example.com', teamId: teams[1]._id.toString(), profile: 'Sprint specialist' },
    { name: 'Maya Patel', email: 'maya@example.com', teamId: teams[0]._id.toString(), profile: 'Marathon hopeful' },
    { name: 'Noah Rivera', email: 'noah@example.com', teamId: teams[2]._id.toString(), profile: 'Yoga instructor' },
    { name: 'Sophia Kim', email: 'sophia@example.com', teamId: teams[1]._id.toString(), profile: 'Crossfit background' },
  ]);

  // Update teams memberIds
  await Team.updateOne({ _id: teams[0]._id }, { $set: { memberIds: [users[0]._id.toString(), users[2]._id.toString()] } });
  await Team.updateOne({ _id: teams[1]._id }, { $set: { memberIds: [users[1]._id.toString(), users[4]._id.toString()] } });
  await Team.updateOne({ _id: teams[2]._id }, { $set: { memberIds: [users[3]._id.toString()] } });

  // Create activities
  const activities = await Activity.create([
    { userId: users[0]._id.toString(), type: 'running', durationMinutes: 45, caloriesBurned: 420, date: new Date() },
    { userId: users[1]._id.toString(), type: 'sprinting', durationMinutes: 20, caloriesBurned: 260, date: new Date() },
    { userId: users[2]._id.toString(), type: 'cycling', durationMinutes: 60, caloriesBurned: 600, date: new Date() },
    { userId: users[3]._id.toString(), type: 'yoga', durationMinutes: 50, caloriesBurned: 180, date: new Date() },
    { userId: users[4]._id.toString(), type: 'crossfit', durationMinutes: 40, caloriesBurned: 480, date: new Date() },
  ]);

  // Create workouts
  const workouts = await Workout.create([
    { title: 'Hill Repeats', description: 'Short uphill sprints', difficulty: 'hard', durationMinutes: 30, recommendedFor: ['sprint', 'endurance'] },
    { title: 'Long Steady Run', description: 'Endurance base run', difficulty: 'medium', durationMinutes: 60, recommendedFor: ['endurance'] },
    { title: 'Vinyasa Flow', description: 'Dynamic yoga flow', difficulty: 'easy', durationMinutes: 45, recommendedFor: ['mobility', 'recovery'] },
  ]);

  // Leaderboard entries
  const leaderboard = await LeaderboardEntry.create([
    { userId: users[2]._id.toString(), username: users[2].name, score: 1840, rank: 1 },
    { userId: users[0]._id.toString(), username: users[0].name, score: 1500, rank: 2 },
    { userId: users[4]._id.toString(), username: users[4].name, score: 1320, rank: 3 },
  ]);

  console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, ${leaderboard.length} leaderboard entries`);

  // Verify via model counts
  const counts = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    LeaderboardEntry.countDocuments(),
  ]);
  console.log('Database counts (users, teams, activities, workouts, leaderboard):', counts);

  // Try to verify via API routes if server is running
  try {
    const res = await (globalThis as any).fetch('http://localhost:8000/api/users');
    if (res.ok) {
      const body = await res.json();
      console.log(`/api/users returned ${Array.isArray(body) ? body.length : 'unknown'} records`);
    } else {
      console.log('/api/users responded with status', res.status);
    }
  } catch (err) {
    console.log('API verification skipped — start the backend server to verify API endpoints: http://localhost:8000');
  }

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
