const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json("Only Admin can create projects");
  }

  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.json(project);
});

// Get all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete Project
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json("Project deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;