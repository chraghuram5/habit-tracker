const express=require('express');
const port=8000;
const app=express();
const db=require('./config/mongoose');
app.use(express.urlencoded());

//use express router
app.use('/',require('./routes/index.js'));

//setting view engine 
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));

//listener
app.listen(port, function(err){
    if(err){
        console.log("Error Running server on port:"+port);
        return;
    }
    console.log("console Running on port:"+port);
})