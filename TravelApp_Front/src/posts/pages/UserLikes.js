import React from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import PostList from '../components/PostList';

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
        creator: 'u1',
        datePosted: '01/01/2021'
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
        creator: 'u2',
        datePosted: '01/02/2021'
    }
];

const USERS = [
    {
        id: 'u1',
        username: '@julia123',
        name: 'Julia Howes',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        posts: 3
    },
    {
        id: 'u2',
        username: '@neil123',
        name: 'Neil Schultz-Cox',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        posts: 2
    }
];

const UserLikes = () => {
    const userId = useParams().uid;
    const user = USERS.find(u => u.id === userId);
    const likedPosts = POSTS;

    if (likedPosts.length === 0) {
        return (
            <React.Fragment>
                <Card className="no-places">You have not liked any posts.</Card>
            </React.Fragment> 
        )
    }

    return (
        <React.Fragment>
            <PostList items={likedPosts} />
        </React.Fragment>
        
    ) 
};

export default UserLikes;