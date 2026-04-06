const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

    amount : {
        type: Number,
  required: true,
  min: 0
    },
    type : {
        type: String,
  enum: ["income", "expense"],
  lowercase: true,
  trim: true,
  required: true
    },
    category :{
        type : String,
         required: true,
  lowercase: true,
  trim: true
    },
    date : {
        type : Date,
        default : Date.now
    },
    notes : {
        type : String
    },
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
 
}, {
    timestamps : true
  }
)
transactionSchema.index({ user: 1, date: -1 });
const Transactions = mongoose.model("Transactions" , transactionSchema )

module.exports = Transactions