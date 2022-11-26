const router = require('express').Router();
const authController = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareControllers');

//Register
router.post("/register", authController.registerUser);

//Login
router.post("/login", authController.loginUser);

//Refresh
router.post("/refresh", authController.requestRefreshToken);

//Logout
router.post("/logout", authController.logoutUser);

module.exports = router;