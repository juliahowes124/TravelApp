import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
    const postId = useParams().pid;
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/posts/${postId}/likes`, 'GET', null, { Authorization: 'Bearer ' + auth.token});
                setLoadedUsers(responseData.likers);
            } catch (err) {
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
    <React.Fragment>
        {error !== null && <ErrorModal error={error} onClear={clearError} />}
        {isLoading && (
            <div className="center">
                <LoadingSpinner/>
            </div>
        )}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
    )
    
};

export default Users;