const mongoose=require('mongoose');
const daySchema=require('../models/day').daySchema;

const habitSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    details:[
        daySchema
    ]
},{
    timestamps:true
});

const Habit=mongoose.model('Habit', habitSchema);

module.exports=Habit;