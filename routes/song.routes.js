const express = require('express');
const Song = require('../models/song.model');

const router = express.Router();

// middleware
function isAuth(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}

// show all songs
router.get('/',isAuth,async(req,res)=>{
    const songs = await Song.find();
    res.render('songs',{songs,user:req.user});
});


// create page
router.get('/new',isAuth,(req,res)=>{
    res.render('new',{user:req.user});
});

// create song
router.post('/',isAuth,async(req,res)=>{
    const { songName, duration, singer } = req.body;
    await Song.create({ songName, duration, singer });
    res.redirect('/songs');
});

// edit page
router.get('/:id',isAuth,async(req,res)=>{
    const song = await Song.findById(req.params.id);
    res.render('edit',{song,user:req.user});
});

// update (only songName)
router.post('/:id',isAuth,async(req,res)=>{
    await Song.findByIdAndUpdate(req.params.id,{
        songName:req.body.songName
    });
    res.redirect('/songs');
});

// delete
router.post('/:id/delete',isAuth,async(req,res)=>{
    await Song.findByIdAndDelete(req.params.id);
    res.redirect('/songs');
});

module.exports = router;