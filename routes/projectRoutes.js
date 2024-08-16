const express = require("express");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  editEpisode,
} = require("../controllers/projectController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createProject).get(protect, getProjects);

router
  .route("/:id")
  .put(protect, updateProject)
  .post(protect, editEpisode)
  .delete(protect, deleteProject);

module.exports = router;
