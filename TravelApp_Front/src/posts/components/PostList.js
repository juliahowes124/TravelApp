import React from 'react';

import PostItem from './PostItem';
import './PostList.css';

const PostList = props => {
    return (
    <ul className="posts-list">
        {props.items
        .map(post => (
            <PostItem 
                key={post.id}
                id={post.id}
                image={post.image}
                title={post.title}
                caption={post.caption}
                address={post.address}
                creatorId={post.creator} 
                coordinates={post.location}
                datePosted={post.datePosted}
                isUserPosts={props.isUserPosts}
                onDelete={props.onDeletePost}
            />
        ))}
    </ul>
    )

    // .sort((a,b) => {
    //     return new Date(a.datePosted).getTime() - 
    //         new Date(b.datePosted).getTime()
    // }).reverse()

};

export default PostList;