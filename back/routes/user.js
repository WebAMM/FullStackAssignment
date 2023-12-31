const express = require("express");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const userController = require("../controllers/user");

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").trim().isEmail(),
    check("password", "Please enter a valid password")
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.login
);

router.get("/userInfo", auth, userController.userInfo);
router.get("/logout", auth, userController.logout);

module.exports = router;
