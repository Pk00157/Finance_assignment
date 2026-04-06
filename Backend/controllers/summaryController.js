const Transactions = require("../models/TransactionModel")
const mongoose = require("mongoose")

exports.getSummary = async(req, res) =>{
    try {
        let matchstage = {};

        if(req.user.role !== "admin") {
            console.log(typeof req.user.id);
            matchstage.user = new mongoose.Types.ObjectId(req.user.id)
        }
        console.log("USER:", req.user);
        console.log("MATCH:", matchstage);
        const result = await Transactions.aggregate([
            {$match : matchstage},  
            {$group : {
                _id :  null,    
                totalIncome : {
                    $sum :{
                        $cond :[
                            {$eq : ["$type" ,"income"]} , "$amount" , 0
                        ]
                    }
                },
                totalExpense : {
                    $sum : {
                        $cond :[
                            {$eq : ["$type", "expense"]} , "$amount" , 0
                        ]
                    }
                }
            }}
        ])  ;
        const categoryWise = await Transactions.aggregate([
  { $match: matchstage },
  {
    $group: {
      _id: "$category",
      total: { $sum: "$amount" }
    }
  }
]);
const monthlyTrends = await Transactions.aggregate([
  { $match: matchstage },
  {
    $group: {
      _id: {
        month: { $month: "$date" },
        year: { $year: "$date" }
      },
      total: { $sum: "$amount" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);
        console.log(monthlyTrends);


        if(result.length === 0)
        {
            return res.json({
                totalIncome : 0,
                totalExpense :0,
                netBalance : 0
            })
        }

        const totalIncome = result[0].totalIncome;
        const totalExpense = result[0].totalExpense;

        const netBalance = totalIncome - totalExpense;

        res.json({
            totalIncome,            
            totalExpense,
            netBalance,
            categoryWise,
            monthlyTrends
        })
        
    } catch (err) {
        res.status(500).json({message : "failed to fetch the summary"});
    }
}