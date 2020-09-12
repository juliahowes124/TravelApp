import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            username: '@julia123',
            name: 'Julia Howes',
            image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
            places: 3
        },
        {
            id: 'u2',
            username: '@neil123',
            name: 'Neil Schultz-Cox',
            image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
            places: 2
        }
    ];

    return <UsersList items={USERS} />
};

export default Users;