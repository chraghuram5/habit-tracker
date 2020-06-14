
const Habit=require('../models/habit');

//displays all habits
module.exports.home=function(req,res){
    
    Habit.find({}, function(err, habits){
        return res.render('habits',{
            habits: habits
        })
    })
}

//create a habit
module.exports.createHabit=function(req,res){
    let details=[];
    let currentDate=new Date();
    for(let i=6;i>=-10;i--){
        let newDate=new Date();
        newDate.setDate(currentDate.getDate()-i);
        let status="None";
        let detailsObject={};
        detailsObject.date=newDate;
        detailsObject.status=status;
        details.push(detailsObject);
    }
    let habit={};
    habit.title=req.body.title;
    habit.details=details;
    Habit.create(habit, function(err, newHabit){
        if(err){
            console.log("habit addition failed");
            return;
        }
        return res.redirect('/home');
    })
}

//habits for day view
module.exports.dayView=function(req,res){
    Habit.find({}, function(err, habits){
        res.render('week-view', {
            habits: habits
        })
    })
}

//edits a habit
module.exports.editStatus=function(req,res){
    let habitId=req.query.id;
    let detailId=req.query.did;
    let detailStatus=req.query.status;
    console.log(habitId);
    Habit.findById(habitId).then(doc=>{
        detail=doc.details.id(detailId);
        detail["status"]=detailStatus;
        doc.save();
    }).catch(err=>{console.log("error")});
    res.redirect('/day-view');
}


//delete habit
module.exports.deleteHabit=function(req,res){
    let habitId=req.query.id;
    Habit.findByIdAndDelete(habitId, function(err){
        res.redirect('/home')
    })
}