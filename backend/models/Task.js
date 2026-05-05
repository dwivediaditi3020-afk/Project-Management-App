const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo"
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: Date
});

module.exports = mongoose.model("Task", taskSchema);