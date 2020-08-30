import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './PostItem.css';

const PostItem = props => {
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
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>  
            </Card>
        </li>
    )
    

};

export default PostItem;