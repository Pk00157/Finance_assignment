const express = require("express")
const router = express.Router();

const {getSummary} = require("../controllers/summaryController")
const authMiddleware = require("../middleware/authmiddleware");
const authmiddleware = require("../middleware/authmiddleware");
const authorize = require("../middleware/authorize");

router.get("/" , authmiddleware , authorize("admin" , "analyst") ,getSummary);

module.exports = router;