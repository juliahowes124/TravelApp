import React from 'react';

import PostList from '../components/PostList';

const Posts = () => {

    const POSTS = [
        {
            id: 'p1',
            title: 'Empire State Building',
            caption: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://cdn.getyourguide.com/img/location/5ca3484e4fa26.jpeg/148.jpg',
            address: '20 W 34th St, New York, NY 10001',
            location: {
                lat: 40.7484,
                lng: -73.9857
            },
            creator: 'u1'
        }
    ];

    return (
        <PostList items={POSTS} />
    )

};

export default Posts;