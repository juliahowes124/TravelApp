const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');

let DUMMY_POSTS = [
    {
        id: 'p1',
        title: 'Empire State Building',
        caption: 'famous building',
        location: {
            lat: 40.7,
            lng: -73
        },
        address: '123 test st. New York, NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        caption: 'famous building',
        location: {
            lat: 40.7,
            lng: -73
        },
        address: '123 test st. New York, NY 10001',
        creator: 'u1'
    }
];

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
 
//FIX
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
    
    res.json({userPost: userWithPosts.posts.map(post => post.toObject({ getters: true}))});
};

const getLikedPosts = (req, res, next) => {
    res.json({message: "retrieves liked posts"});
}

const getLikesForPost = (req, res, next) => {
    const postId = req.params.pid;
    const post = DUMMY_POSTS.find(p => {
        return p.id === postId;
    });
    if (!post) {
        return next(new HttpError('Could not find post with provided id', 404));
    }

    res.json({message: "retrieves likes for post"});
}

const createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const {title, caption, address, creator} = req.body;

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
        image: 'https://cdn.getyourguide.com/img/location/5ca3484e4fa26.jpeg/148.jpg',
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
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
        await createdPost.save({ session: sess}); // failed here
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
    const post = DUMMY_POSTS.find(p => {
        return p.id === postId;
    });
    if (!post) {
        return next(new HttpError('Could not find post with provided id', 404));
    }
    res.json({message: "creates a like"});
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
    
    res.status(200).json({message: 'Deleted post.'});

};

const deleteUserFromLikes = (req, res, next) => {
    const postId = req.params.pid;
    const userId = req.params.uid;
    const post = DUMMY_POSTS.find(p => {
        return p.id === postId;
    });
    if (!post) {
        return next(new HttpError('Could not find post with provided id', 404));
    }
    res.json({message: 'Deletes user from likes'});
}

const updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
exports.getPostsByUserId = getPostsByUserId;
exports.getLikedPosts = getLikedPosts;
exports.getLikesForPost = getLikesForPost;
exports.createPost = createPost;
exports.createLike = createLike;
exports.deletePost = deletePost;
exports.deleteUserFromLikes = deleteUserFromLikes;
exports.updatePost = updatePost;