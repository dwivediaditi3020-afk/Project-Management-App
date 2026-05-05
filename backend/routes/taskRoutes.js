const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create Task
router.post("/", auth, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo")
    .populate("project");

  res.json(tasks);
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;