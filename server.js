const express = require("express");
require("dotenv").config();
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve your static files (HTML, CSS, JS)
app.use(express.static("public"));

// Endpoint to update workout data
app.post("/workout", (req, res) => {
  fs.readFile("workoutData.json", "utf8", (readErr, data) => {
    if (readErr) {
      res.status(500).send("Error reading existing data");
    } else {
      const existingData = JSON.parse(data);
      const { workoutSession, exerciseId, newData } = req.body;

      // Find the right workout session and exercise
      const session = existingData[workoutSession - 1];
      const exercise = session.find((ex) => ex.id === exerciseId);

      if (exercise) {
        // Update the exercise with the new data
        Object.assign(exercise, newData);
      }

      fs.writeFile(
        "workoutData.json",
        JSON.stringify(existingData, null, 2),
        "utf8",
        (writeErr) => {
          if (writeErr) {
            res.status(500).send("Error saving workout data");
          } else {
            res.send("Workout data updated successfully");
          }
        }
      );
    }
  });
});

const weightsRouter = require("./routes/weights");
app.use("/api/weights", weightsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
