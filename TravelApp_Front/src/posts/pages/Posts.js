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
        },
        {
            id: 'p2',
            title: 'Great Wall of China',
            caption: 'A big wall!',
            imageUrl: 'https://www.snopes.com/tachyon/2018/07/great_wall_of_china.jpg?resize=865,452',
            address: 'Huairou District, China',
            location: {
                lat: 40.4319,
                lng: 116.5704
            },
            creator: 'u2'
        }
    ];

    return (
        <PostList items={POSTS} />
    )

};

export default Posts;