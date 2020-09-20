import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import PostList from '../components/PostList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Posts = () => {

    const [loadedPosts, setLoadedPosts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/posts`);
                setLoadedPosts(responseData.posts);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <div className="center">
                {isLoading && <LoadingSpinner/>}
            </div>
            {error !== null && <ErrorModal error={error} onClear={clearError}/>}
            {loadedPosts && <PostList items={loadedPosts} />}
        </React.Fragment>
        
    )

};

export default Posts;