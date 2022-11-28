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

<<<<<<< HEAD
//Update pass
router.post("/updatepass/:id", userController.updatePassUser);

=======
>>>>>>> 7ef4a5a54f3bf99b4793382b54883414515bbc87
module.exports = router;