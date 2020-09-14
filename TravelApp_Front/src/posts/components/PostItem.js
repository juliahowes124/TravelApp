import React from 'react';
import { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './PostItem.css';

const PostItem = props => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
        console.log(showConfirmModal);
    };
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };
    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log("DELETING...");
    }
    const showMapHandler = () => {
        setShowMapModal(true);
    }
    const hideMapHandler = () => {
        setShowMapModal(false);
    }


    const isUsersPost = false;
    return (
        <React.Fragment>

        {showMapModal && 
            <Modal
                header={props.address}
                footer={
                    <Button onClick={hideMapHandler}>Exit</Button>
                }
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}></Map>
                </div>
                
            </Modal>
        }

        {showConfirmModal && 
            <Modal
            
            header="Are you sure?"
            footerClass="post-item__modal-actions"
            footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </React.Fragment>
            }>
            <p>Are you sure you want to delete this place? This can't be undone.</p>
        </Modal> 
        }
            
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
                    <Button inverse onClick={showMapHandler}>VIEW ON MAP</Button>
                    {!isUsersPost && (
                        <React.Fragment>
                            <Button inverse to={`/${props.creatorId}/posts`}>VIEW USER</Button>
                            <Button>LIKE</Button>
                        </React.Fragment>
                    )}
                    {isUsersPost && (
                        <React.Fragment>
                            <Button to={`/posts/${props.id}`}>EDIT</Button>
                            <Button onClick={showDeleteWarningHandler} danger>DELETE</Button>
                        </React.Fragment>
                    )}
                    
                </div>  
            </Card>
        </li>

        </React.Fragment>
        
       
    )
    

};

export default PostItem;