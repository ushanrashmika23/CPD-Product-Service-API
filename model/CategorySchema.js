const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true
    },
    icon:{
        type: Object
    },
    availableCountries:{
        type: Array,
        required: true
    }
});
module.exports= mongoose.model("category", CategorySchema);