import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './UserItem.css';

const UserItem = props => {
    return (
        <li className="user-item">
                <Card className="user-item__content">
                <div className="user-item__image">
                    <Avatar image={`http://localhost:5000/${props.image}`} name={props.name} />
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <p>{props.username}</p>
                    <Button inverse to={`/${props.id}/posts`}>
                        View Profile
                    </Button>
                </div>
                </Card>
        </li>
    )
};

export default UserItem;