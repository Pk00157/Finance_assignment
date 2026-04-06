const express = require('express')

const router = express.Router();

const { createUser, updateUserRole, getUsers }  = require("../controllers/userController");
const authmiddleware = require('../middleware/authmiddleware');
const authorize = require('../middleware/authorize');

router.post("/", createUser);
router.put("/:id",  authmiddleware, authorize("admin"), updateUserRole);
router.get("/",  authmiddleware, authorize("admin"), getUsers);

module.exports = router;