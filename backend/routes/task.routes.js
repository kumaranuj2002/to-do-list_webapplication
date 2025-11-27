const router = require("express").Router();
const auth = require("../middleware/auth");
const TaskController = require("../controllers/task.controller");

router.get("/", auth, TaskController.getTasks);
router.post("/", auth, TaskController.createTask);
router.put("/:id", auth, TaskController.updateTask);
router.delete("/:id", auth, TaskController.deleteTask);

module.exports = router;
