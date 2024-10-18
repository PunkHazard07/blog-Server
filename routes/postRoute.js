const express = require('express');
const Post = require('../models/Post');//import the Post model
const router = express.Router(); //Create a new router instance

//fectch all post endpoint
router.get('/post', async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        //handle any errors that occur
        res.status(500).json({
            success: false,
            msg: 'error fetching posts',
            error: error.message
        })
    }
});

//create new post endpoint
router.post('/create-post', async (req, res) => {
    //destructure the request body
    const {title, content, category, tags, postImg} = req.body;
    //create a new post
    try {
        const post = new Post ({
            title,
            postImg,
            body: content,
            category,
            tags
        });
        const savedPost = await post.save();
        res.status(201).json({success: true, data: savedPost})
    } catch (error) {
        res.json({message: error})
    }
});

//fetching single post endpoint
router.get('/post/:postId', async (req, res) => {
    //extract postId
    const {postId} = req.params;
    //fetch single post
    try {
        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({success: false, message: 'Post not found'})
        }
        res.status(200).json({success: true, data: post })
    } catch (error) {
        res.json({message: error});
    }
});

//update post endpoint
router.put('/update-post/:postId', async (req, res) => {
    //extract postId
    const {postId} = req.params;
    //destructuring the request body
    const {title, content, category, tags, postImg} = req.body;
    //update post
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            title,
            postImg,
            body: content,
            category,
            tags,
        }, {new: true});
        if (!updatedPost) {
            return res.status(404).json({success: false, message: "Not to do with post"})
        }
        res.status(200).json({success: true, data: updatedPost})
    } catch (error) {
        res.json({message: error});
    }
});
//delete post endpoint
router.delete('/delete-post/:postId', async (req, res) => {
    //extract postId
    const {postId} = req.params;
    //delete post
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);

        if(!deletedPost) {
            return res.status(404).json({success: false, message:" Not to do with Delete post"});
        }
        res.status(200).json({success: true, message: "post deleted"})
    } catch (error) {
        res.json({message: error});
    }
});

// filter post by category endpoint
router.get('/posts/category/:category', async (req, res) => { 
    // extract category
    const { category } = req.params;
    // filter post by category
    try {
        const posts = await Post.find({ category });

        if (!posts) {
            return res.status(404).json({success: false, message: 'Post not found'});
        }
        
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.json({ message: error });
    }
});


//export the router to use it in the main server
module.exports = router;