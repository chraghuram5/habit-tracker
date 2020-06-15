const express=require('express');
const router=express.Router();
const app=express();
app.use(express.urlencoded());
//importing controller
const homeController=require('../controllers/home_controller');

router.get('/home',homeController.home);
router.post('/create-habit', homeController.createHabit);
router.get('/day-view', homeController.dayView);
router.get('/edit-status', homeController.editStatus);
router.get('/delete', homeController.deleteHabit);
router.get('/add-task', homeController.addTask);
module.exports=router;