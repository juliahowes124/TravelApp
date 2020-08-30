import React from 'react';

import PostItem from './PostItem';
import './PostList.css';

const PostList = props => {
    return (
    <ul className="posts-list">
        {props.items.map(post => (
            <PostItem 
                key={post.id}
                id={post.id}
                image={post.imageUrl}
                title={post.title}
                caption={post.caption}
                address={post.address}
                creatorId={post.creator} 
                coordinates={post.location}
            />
        ))}
    </ul>
    )

};

export default PostList;