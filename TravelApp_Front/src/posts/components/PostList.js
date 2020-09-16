import React from 'react';

import PostItem from './PostItem';
import './PostList.css';

const PostList = props => {
    return (
    <ul className="posts-list">
        {props.items
        .sort((a,b) => {
            return new Date(a.datePosted).getTime() - 
                new Date(b.datePosted).getTime()
        }).reverse()
        .map(post => (
            <PostItem 
                key={post.id}
                id={post.id}
                image={post.imageUrl}
                title={post.title}
                caption={post.caption}
                address={post.address}
                creatorId={post.creator} 
                coordinates={post.location}
                datePosted={post.datePosted}
                isUserPosts={props.isUserPosts}
            />
        ))}
    </ul>
    )

};

export default PostList;