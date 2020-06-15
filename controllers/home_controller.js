
const Habit=require('../models/habit');

//displays all habits
module.exports.home= async function(req,res){
    let currentDate=new Date();
    try{
        let habitList= await Habit.find({});
        res.render('habits',{
        habits: habitList
    })
    }
    catch(err){
        console.log(err);
    }
}

//create a habit
module.exports.createHabit=function(req,res){
    let details=[];
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

//adds new task
module.exports.addTask=async function(req,res){
    let id=req.query.id;
    let detailDate=req.query.date;
    let detailStatus=req.query.status;
    let detail={};
    detail.date=detailDate;
    detail.status=detailStatus;
    let habit=await Habit.find({id:id,"details.date":detailDate});
    if(habit.length==0){
        Habit.findById(id).then(doc=>{
            details=doc.details;
            details.push(detail);
            doc.save();
        }).catch(err=>{console.log("error")});
    }

    return res.redirect('/day-view');
}