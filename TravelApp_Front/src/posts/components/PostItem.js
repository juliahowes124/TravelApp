import React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
 
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PostItem.css';

JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)

const PostItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const history = useHistory();
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
            await sendRequest(`http://localhost:5000/api/posts/${props.id}`,'DELETE', null, {Authorization: 'Bearer ' + auth.token});
            props.onDelete(props.id);
        } catch (err) {}
    };
    const showMapHandler = () => {
        setShowMapModal(true);
    }
    const hideMapHandler = () => {
        setShowMapModal(false);
    }

    const likeHandler = async () => {
        try {
            await sendRequest(`http://localhost:5000/api/posts/${props.id}/likes`, 'POST', null, {
                Authorization: 'Bearer ' + auth.token
            });
        } catch (err) {
        }
        
    }
    const removeLikeHandler = async () => {
        try {
            await sendRequest(`http://localhost:5000/api/posts/${props.id}/likes`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            });
            props.onRemoveLike(props.id);
        } catch (err) {
        }
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
                    <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
                </div>
                <div className="post-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <small>Posted: <ReactTimeAgo date={props.dateCreated} /></small>
                    <p>{props.caption}</p>
                </div>
                <div className="post-item__actions">
                    <Button onClick={showMapHandler}>VIEW ON MAP</Button>
                    {auth.isLoggedIn && auth.userId !== props.creatorId && (
                        <React.Fragment>
                            <Button onClick={likeHandler}>LIKE</Button>
                            <Button onClick={removeLikeHandler}>UNLIKE</Button>
                        </React.Fragment>
                    )}
                    {!props.isUserPosts && auth.userId !== props.creatorId && (
                        <Button to={`/${props.creatorId}/posts`}>VIEW USER</Button>
                    )}
                    {auth.userId === props.creatorId && (
                        <React.Fragment>
                            <Button inverse to={`/posts/${props.id}`}>EDIT</Button>
                            <Button inverse onClick={showDeleteWarningHandler} danger>DELETE</Button>
                            <Button to={`/${props.id}/likers`}>LIKES</Button>
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