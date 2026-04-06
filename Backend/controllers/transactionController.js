const Transactions = require("../models/TransactionModel");


exports.createTransaction = async(req,res) =>{
  
    try {
        const { amount, type, category, date, notes} = req.body;
          console.log(req.user)
    if(!amount || !type || !category){
        return res.status(400).json({message : "Required Fields Missing"})
    }

    const transaction = await Transactions.create({
        amount,
         type,
          category, 
          date, 
          notes,
          user : req.user.id
    })
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.getTransactions = async(req , res) =>
{
    try {
        let transactions;

        if(req.user.role === "admin"){
            transactions = await Transactions.find();
        }else{
            transactions = await Transactions.find({user : req.user.id})
        }
        res.json(transactions);

    } catch (err) {
        res.status(500).json({message : err.message})
        
    }
}

exports.updateTransaction = async (req,  res)=>{
    try {
        const transaction = await Transactions.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({message : "Not found !"})
        }

    if (
      transaction.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updated = await Transactions.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
        res.json({message : "Updated succesfully" , updated});

    } catch (err) {

        res.status(500).json({message : err.message})
    }
}

exports.deleteTransaction = async(req,res)=>{
    try {
        const transaction = await Transactions.findById(req.params.id)

        if(!transaction){
            return res.status(404).json({message: "Not found !"})

        }

        if(
            transaction.user.toString() !== req.user.id &&
            req.user.role !== "admin" 
        ){
            return res.status(403).json({message : "unauthorized"})
        }

        await transaction.deleteOne();

        res.json({message: "deleted successfully"})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
}