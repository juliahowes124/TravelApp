const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');

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

const getPosts = (req, res, next) => {
    const posts = DUMMY_POSTS;
    res.json({posts});
};
 
const getPostsByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const userPlaces = DUMMY_POSTS.filter(p => {
        return p.creator === userId;
    })

    if (!userPlaces || userPlaces.length === 0) {
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }
    
    res.json({userPlaces});
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
    const {title, caption, address, creator} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPost = {
        id: uuid(),
        title,
        caption,
        location: coordinates,
        address,
        creator
    }

    

    DUMMY_POSTS.push(createdPost);

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
  
const deletePost = (req, res, next) => {
    const postId = req.params.pid;
    if (!DUMMY_POSTS.find(p => p.id === postId)) {
        throw new HttpError('Could not find a place for that id', 404);
    }
    DUMMY_POSTS = DUMMY_POSTS.filter(p => p.id !== postId);

    res.status(200).json({message: 'Deleted place.'});

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

const updatePost = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }
    
    const postId = req.params.pid;
    const postForUpdate = { ...DUMMY_POSTS.find(p => p.id === postId) };
    const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);
    const {title, caption, address} = req.body;
    postForUpdate.title = title;
    postForUpdate.caption = caption;
    postForUpdate.address = address;

    DUMMY_POSTS[postIndex] = postForUpdate;

    res.status(200).json({post: postForUpdate});
    
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