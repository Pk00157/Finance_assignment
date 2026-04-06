require("dotenv").config();
const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = require("./userController")

exports.signup = async(req , res) =>{
    try {
        const {email , password ,role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already Exists"});
        }
        const hashcode = await bcrypt.hash(password , 10);
        const user = await User.create({
            email,
            password : hashcode,
            role : "viewer",
        })
        res.status(201).json({
            message:"User Created Successfully",
            user
        })
    } catch (err) {
        res.status(500).json({message : err.message});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
        );
        const role = user.role;

        res.json({
            message: "Login Successful",
            token,
            role
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};