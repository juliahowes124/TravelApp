import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PostItem.css';

const PostItem = props => {
    console.log(props.creatorId);
    return (
        <li className="post-item">
            <Card className="post-item__content">
                <div className="post-item__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="post-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.caption}</p>
                </div>
                <div className="post-item__actions">
                    <Button inverse>VIEW ON MAP</Button>
                    <Button>LIKE</Button>
                    <Button inverse to={`/${props.creatorId}/posts`}>VIEW USER</Button>
                    <Button to={`/posts/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>  
            </Card>
        </li>
    )
    

};

export default PostItem;