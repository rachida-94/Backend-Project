const router = require('express').Router();
const Project = require('../models/project');
const verifyAuthentication = require('../middleware/autth-middleware');

router.use(verifyAuthentication);

router.post('/', async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user._id });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized update.' });
    }
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.user.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized delete.' });
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;