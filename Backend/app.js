require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express();
const connectDB = require("./db");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const transactionRoutes = require("./Routes/transactionRoutes");
const summaryRoutes = require("./Routes/summaryRoutes")
const { applyTimestamps } = require('./models/UserModel');
const corsMiddleware = require("./middleware/corsMiddleware");
const port = 3000;

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes)
app.use("/api/summary" ,summaryRoutes)
app.get('/', (req , res)=>{
    res.send("hello world")
})

app.listen(port , ()=>{
    console.log(`App listening on port ${port}`)
})

module.exports = app;