import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT ?? 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

mongoose.set('strictQuery', false);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri}`);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
