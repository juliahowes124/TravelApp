import React from 'react';
import { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PostItem.css';

const PostItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
        console.log(showConfirmModal);
    };
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(`http://localhost:5000/api/posts/${props.id}`,'DELETE');
            props.onDelete(props.id);
        } catch (err) {}
    };
    const showMapHandler = () => {
        setShowMapModal(true);
    }
    const hideMapHandler = () => {
        setShowMapModal(false);
    }

    return (
        <React.Fragment>
        {error !== null && <ErrorModal error={error} onClear={clearError} />}
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
                {isLoading && <LoadingSpinner asOverlay />}
                <div className="post-item__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="post-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>Posted: {props.datePosted}</p>
                    <p>{props.caption}</p>
                </div>
                <div className="post-item__actions">
                    <Button onClick={showMapHandler}>VIEW ON MAP</Button>
                    {auth.isLoggedIn && auth.userId !== props.creatorId && <Button to={'/u1/likes'}>LIKE</Button>}
                    {!props.isUserPosts && auth.userId !== props.creatorId && (
                        <Button to={`/${props.creatorId}/posts`}>VIEW USER</Button>
                    )}
                    {auth.userId === props.creatorId && (
                        <React.Fragment>
                            <Button inverse to={`/posts/${props.id}`}>EDIT</Button>
                            <Button inverse onClick={showDeleteWarningHandler} danger>DELETE</Button>
                        </React.Fragment>
                    )}
                    {!auth.isLoggedIn && (
                        <Button to={'/auth/register'}>LIKE</Button>
                    )} 
                    
                </div>  
            </Card>
        </li>

        </React.Fragment>
        
       
    )
    

};

export default PostItem;