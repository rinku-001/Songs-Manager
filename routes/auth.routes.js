const express = require('express');
const passport = require('passport');
const User = require('../models/user.model');

const router = express.Router();

// register
router.get('/register',(req,res)=>{
    res.render('register');
});

router.post('/register',async(req,res)=>{
    await User.create(req.body);
    res.redirect('/login');
});

// login
router.get('/login',(req,res)=>{
    res.render('login');
});

router.post('/login',
    passport.authenticate('local',{
        successRedirect:'/songs',
        failureRedirect:'/login'
    })
);

// logout
router.get('/logout',(req,res)=>{
    req.logout(()=>{});
    res.redirect('/login');
});

module.exports = router;