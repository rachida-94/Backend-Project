const router = require('express').Router();
const Task = require('../models/task');
const Project = require('../models/project');
const verifyAuthentication = require('../middleware/autth-middleware');

router.use(verifyAuthentication);

router.post('/:projectId/tasks', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project || !project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized to add task.' });
    }

    const task = await Task.create({ ...req.body, project: project._id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:projectId/tasks', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project || !project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized to view tasks.' });
    }

    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('project');
    if (!task || !task.project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized to update task.' });
    }

    const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('project');
    if (!task || !task.project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized to delete task.' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;