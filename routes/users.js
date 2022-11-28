const router = require("express").Router();
const middlewareController = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");

//Get all users
router.get("/", userController.getAllUsers);

//Get user by id
router.get("/:id", userController.getUserById);

//Delete user
router.delete("/:id", userController.deleteUser);

//Update user
router.put("/:id", userController.updateUser);

//Update pass
router.post("/updatepass/:id", userController.updatePassUser);

module.exports = router;