const express = require("express");

const auth = require("../middlewares/auth");
const adminController = require("../controllers/admin");
const { check } = require("express-validator");
// const admin = require("../middlewares/admin");

const router = express.Router();

router.post(
  "/new",
  auth,
  [
    check("name", "Please fill out the field").trim().notEmpty(),
    check("Tasks", "Please fill out the field").trim().notEmpty(),
    check("creator", "Please Select the user Name").trim().notEmpty(),
    check("published", "Please Select a Valid date").isISO8601().toDate(),
  ],

  adminController.createTaskEntry
);

router.get("/taskList", auth, adminController.findAll);
router.delete("/deleteTask/:id", auth, adminController.delete);
router.post(
  "/edit/:id",
  auth,
  [
    check("name", "Please fill out the field").trim().notEmpty(),
    check("Tasks", "Please fill out the field").trim().notEmpty(),
    check("published").isISO8601().toDate(),
  ],

  adminController.update
);

router.post("/delete/:id", auth, adminController.delete);

module.exports = router;
