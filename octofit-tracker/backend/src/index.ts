import { startServer } from "./server.js";

startServer().catch((error) => {
  console.error("Failed to start OctoFit Tracker API", error);
  process.exit(1);
});
