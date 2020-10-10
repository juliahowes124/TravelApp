import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Card from '../../shared/components/UIElements/Card';
import PostList from '../components/PostList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserLikes = () => {
    const auth = useContext(AuthContext);
    const [loadedPosts, setLoadedPosts] = useState();
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/posts/liked/${auth.userId}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token});
                setLoadedPosts(responseData.likedPosts);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest, auth.userId]);

    if (!isLoading && !loadedPosts) {
        return (
            <React.Fragment>
                <Card className="no-places">You have no liked posts.</Card>
            </React.Fragment>
            
        )
    }

    return (
        <React.Fragment>
            {error !== null && <ErrorModal error={error} onClear={clearError}/>}
            {isLoading && <div className="center"><LoadingSpinner/></div>}
            {!isLoading && loadedPosts && <PostList isUserPosts="false" items={loadedPosts}/>}
        </React.Fragment>
        
    ) 
};

export default UserLikes;