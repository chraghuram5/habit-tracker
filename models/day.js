const mongoose=require('mongoose');

const daySchema=new mongoose.Schema({
    
    status:{
        type:String,
    },
    date:{
        type: String,
    },
});

const Day=mongoose.model('Day',daySchema);

module.exports.Day=Day;
module.exports.daySchema=daySchema;