import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserPosts.css';


const UserPosts = () => {
    const [loadedPosts, setLoadedPosts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().uid;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/posts/user/${userId}`);
                setLoadedPosts(responseData.userPosts);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest, userId]);

    const postDeletedHandler = deletedPostId => {
        setLoadedPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
    }

    if (!isLoading && !loadedPosts) {
        return (
            <React.Fragment>
                <Card className="no-places">This user has no posts.</Card>

            </React.Fragment>
            
        )
    }
    return (
        <React.Fragment>
            {/* <div className="user-posts__user-info">
                <img src={user.image} alt=""/>
                <div className="user-posts__user-details">
                    <h2>{user.name}</h2>
                    <p>{user.username}</p>
                    <p>{user.posts} Posts</p>
                </div>
                
                
                
            </div> */}
            {error !== null && <ErrorModal error={error} onClear={clearError}/>}
            {isLoading && <div className="center"><LoadingSpinner/></div>}
            {!isLoading && loadedPosts && <PostList isUserPosts="true" items={loadedPosts} onDeletePost={postDeletedHandler} />}
        </React.Fragment>
       
        
    ) 
};

export default UserPosts;