const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    proID:{
        type:String,
        required: 'This field is required'
    },
    proName:{
        type:String
    },
    amount:{
        type:String
    },
    price:{
        type:String
    }
})

// custom validation for email

mongoose.model('Product',productSchema);