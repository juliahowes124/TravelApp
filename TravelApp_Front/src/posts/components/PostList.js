import React from 'react';

 
import PostItem from './PostItem';
import './PostList.css';



const PostList = props => {
    return (
    <ul className="posts-list">
        {props.items
        .sort((a,b) => {
        return new Date(a.dateCreated).getTime() - 
            new Date(b.dateCreated).getTime()
        }).reverse()
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
                dateCreated={post.dateCreated}
                isUserPosts={props.isUserPosts}
                onDelete={props.onDeletePost}
            />
        ))}
    </ul>
    )

};

export default PostList;