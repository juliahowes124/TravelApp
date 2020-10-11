const fs = require('fs');
const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const User = require('../models/user');
const Post = require('../models/post');
const Like = require('../models/like');
const mongoose = require('mongoose');

const getPostById = async (req, res, next) => {
    const postId = req.params.pid;
    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError('Could not fetch post.', 500);
        return next(error);
    }
    res.json({post: post.toObject({ getters: true})});
}
const getPosts = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find();
    } catch(err) {
        const error = new HttpError('Could not fetch posts.', 500);
        return next(error);
    }
    res.json({posts: posts.map(post => post.toObject({ getters: true }))});
};
 
const getPostsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithPosts;
    try {
        userWithPosts = await User.findById(userId).populate('posts');
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not find user from database', 500);
        console.log(err);
        return next(error);
    }

    if (!userWithPosts || userWithPosts.posts.length === 0) {
        return next(new HttpError('Could not find a post for the provided user id.', 404));
    }
    
    res.json({userPosts: userWithPosts.posts.map(post => post.toObject({ getters: true}))});
};

const getLikedPosts = async (req, res, next) => {
    const userId = req.userData.userId;

    let likes;
    try {
        likes = await Like.find({user: userId}).populate('post');
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not fetch likes.', 500);
        return next(error);
    }
    
    res.json({likedPosts: likes.map(like => like.post.toObject({ getters: true }))});
}

const getLikesForPost = async (req, res, next) => {
    const postId = req.params.pid;

    let likes;
    try {
        likes = await Like.find({post: postId}).populate('user');
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not fetch likes.', 500);
        return next(error);
    }

    if (!likes || likes.length === 0) {
        return next (new HttpError('No likes yet.'))
    }
    
    res.json({likers: likes.map(like => like.user.toObject({ getters: true }))});
}

const createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const {title, caption, address} = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPost = new Post({
        title,
        caption,
        address,
        location: coordinates,
        image: req.file.path,
        creator: req.userData.userId,
        dateCreated: Date.now()
    });

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch(err) {
        const error = new HttpError('Creating post failed. Could not retrieve user.', 500);
        return next(error);
    }

    if (!user){
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }

    console.log(createdPost);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPost.save({ session: sess});
        user.posts.push(createdPost);
        await user.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating post failed', 500);
        console.log(err);
        return next(error);
    }

    res.status(201).json({post: createdPost});
}

const createLike = async (req, res, next) => {
    const postId = req.params.pid;
    const userId = req.userData.userId;
    
    try {
        user = await User.findById(userId);
        post = await Post.findById(postId);
        existingLike = await Like.find({user: userId}).findOne({post: postId});
    } catch (err) {
        error = new HttpError('Unable to like this post.', 404);
        return next(error);
    }
    
    if (existingLike) {
        return next(new HttpError('You have already liked this post.', 404));
    }

    if (!user || !post) {
        return next(new HttpError('Failed to like this post.', 500));
    }

    const like = new Like({
        user: userId,
        post: postId
    });

    try {
        await like.save();
    } catch(err) {
        const error = new HttpError('Something went wrong. Could not record like for this post.', 500);
    }

    res.status(201).json({like});
}
  
const deletePost = async (req, res, next) => {
    const postId = req.params.pid;

    let post;
    try {
        post = await Post.findById(postId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not fetch post to delete.', 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError('Could not find post for this id', 404);
        return next(error);
    }

    if (post.creator.id !== req.userData.userId) {
        const error = new HttpError(
            "You are not allowed to delete other users' posts",
            401
        );
        return next(error);
    }

    const imagePath = post.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await post.remove({session: sess});
        post.creator.posts.pull(post);
        await post.creator.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not delete post.', 500);
        return next(error);
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    });
    
    res.status(200).json({message: 'Deleted post.'});

};

const deleteLike = async (req, res, next) => {
    const postId = req.params.pid;
    const userId = req.userData.userId;

    let like;
    try {
        like = await Like.find({user: userId}).findOne({post: postId});
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not fetch like to delete.', 500);
        return next(error);
    }

    if (!like) {
        const error = new HttpError('Could not find like for the given post id', 404);
        return next(error);
    }

    try {
        await like.remove();
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not delete like.', 500);
        return next(error);
    }
    
    res.status(200).json({message: 'Deleted like.'});
}

const updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('hello2');
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const postId = req.params.pid;
    const {title, caption, address} = req.body;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not find post in database.', 500);
    }

    if (!post) {
        return next(new HttpError('Could not find post for this id', 404));
    }

    if (post.creator.toString() !== req.userData.userId) {
        const error = new HttpError(
            "You are not allowed to edit other users' posts",
            401
        );
        return next(error);
    }

    post.title = title;
    post.caption = caption;
    post.address = address;

    try {
        await post.save();
    } catch(err) {
        const error = new HttpError('Something went wrong. Could not update post.', 500);
        return next(error);
    }

    res.status(200).json({post: post.toObject({ getters: true })});
    
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.getLikedPosts = getLikedPosts;
exports.getLikesForPost = getLikesForPost;
exports.createPost = createPost;
exports.createLike = createLike;
exports.deletePost = deletePost;
exports.deleteLike = deleteLike;
exports.updatePost = updatePost;