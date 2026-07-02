const express=require('express');
const authControllers=require('../controllers/auth.controllers');
const authToken = require('../middlewares/auth.middlewares');

const router=express.Router();

router.post('/register',authControllers.register);


router.post('/login',authControllers.login);


router.get('/logout',authControllers.logout);


router.get('/getme',authToken,authControllers.getMe);





module.exports=router;