const mongoose = require("mongoose")
const DiscountSchema = new mongoose.Schema(
    {
        discountName:{
            type: String,
            required: true
        },
        persontage:{
            type: Number
        },
        startDate:{
            type:Date
        },
        EndDate:{
            type:Date
        },
        lastUpdate:{
            type:Date
        }
    }
);

module.exports=mongoose.model("discount", DiscountSchema);
