const User = require("../models/UserModel")


exports.createUser = async (req,res) =>{
    try{
        const {email , role , isActive} = req.body;

        const user = await User.createUser({
            email,
            role,
            isActive
        });
        res.json(user);

    }catch(err){
        res.status(500).json({message : err.message});
    }
};
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["viewer", "analyst", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.json({ message: "Role updated", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async(req , res) =>
{
    try {
        let users;

        if(req.user.role === "admin"){
            users = await User.find();
        }else{
            users = await User.find({user : req.user.id})
        }
        res.json(users);
        console.log(users)
    } catch (err) {
        res.status(500).json({message : err.message})
        
    }
}