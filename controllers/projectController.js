const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { name } = req.body;

  try {
    const project = new Project({
      name,
      user: req.user._id,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { episodes } = req.body;
  console.log(episodes);

  try {
    const project = await Project.findById(id);

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    project.episodes.push(episodes[0]);

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editEpisode = async (req, res) => {
  const { id } = req.params;
  const { index, content } = req.body;

  try {
    const project = await Project.findById(id);
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (index < 0 || index >= project.episodes.length) {
      return res.status(400).json({ message: "Invalid episode index" });
    }

    project.episodes[index].content = content;

    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: "Project removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
