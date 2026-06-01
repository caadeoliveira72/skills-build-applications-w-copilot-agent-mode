import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: String, default: null },
    profile: { type: String, default: '' },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    memberIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, default: 'medium' },
    durationMinutes: { type: Number, default: 30 },
    recommendedFor: { type: [String], default: [] },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = models.User || model('User', userSchema);
export const Team = models.Team || model('Team', teamSchema);
export const Activity = models.Activity || model('Activity', activitySchema);
export const Workout = models.Workout || model('Workout', workoutSchema);
export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
