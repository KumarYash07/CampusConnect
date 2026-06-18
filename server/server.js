const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const errorHandler = require(
  "./middleware/errorMiddleware"
);

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "CampusConnect API Running",
  });
});

const userRoutes = require(
  "./routes/userRoutes"
);

const taskRoutes = require(
  "./routes/taskRoutes"
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});