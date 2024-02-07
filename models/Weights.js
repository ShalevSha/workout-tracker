const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: [true, "add field"],
  },
  reps: {
    type: Number,
    required: [true, "add field"],
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Weight", WeightSchema);
