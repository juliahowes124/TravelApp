import React from 'react';
import { useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import Card from '../../shared/components/UIElements/Card';
import './UserPosts.css';

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

const UserPosts = () => {
    const userId = useParams().uid;
    const user = USERS.find(u => u.id === userId);
    const userPosts = POSTS.filter(post => post.creator === userId);

    if (userPosts.length === 0) {
        return (
            <React.Fragment>
                <Card className="no-places">This user has no posts.</Card>

            </React.Fragment>
            
        )
    }
    return (
        <React.Fragment>
            <div className="user-posts__user-info">
                <img src={user.image} alt=""/>
                <div className="user-posts__user-details">
                    <h2>{user.name}</h2>
                    <p>{user.username}</p>
                </div>
                <p>{user.posts} Posts</p>
                
            </div>
            <PostList items={userPosts} />
        </React.Fragment>
       
        
    ) 
};

export default UserPosts;