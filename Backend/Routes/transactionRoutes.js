const express = require("express")
const router = express.Router();

const {createTransaction ,getTransactions,updateTransaction, deleteTransaction} = require("../controllers/transactionController")

const authMiddleware = require("../middleware/authmiddleware");
const authorize = require("../middleware/authorize");


router.post("/" , authMiddleware ,authorize("admin") , createTransaction)
router.get("/" , authMiddleware ,authorize("admin" , "analyst" , "viewer"), getTransactions)
router.put("/:id" , authMiddleware , authorize("admin"), updateTransaction)
router.delete("/:id" , authMiddleware ,  authorize("admin") , deleteTransaction)

module.exports = router;