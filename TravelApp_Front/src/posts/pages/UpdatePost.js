import React, {useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './UpdatePost.css';

const UpdatePost = () => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPost, setLoadedPost] = useState();
    const postId = useParams().pid;
    const history = useHistory();
    const auth = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        caption: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

    const postSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/posts/${postId}`,
            'PATCH',
            JSON.stringify({
            title: formState.inputs.title.value,
            caption: formState.inputs.caption.value,
            address: formState.inputs.address.value 
            }),
            {
                'Content-Type': 'application/json'
            });
            history.push('/' + auth.userId + '/posts') ;
        } catch (err) {}
        
        
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/posts/${postId}`);
                setLoadedPost(responseData.post);
                setFormData({
                    title: {
                        value: responseData.post.title,
                        isValid: true
                    },
                    caption: {
                        value: responseData.post.caption,
                        isValid: true
                    },
                    address: {
                        value: responseData.post.address,
                        isValid: true
                    }
                })
            
        } catch(err) {}
    };
    fetchPost();
    }, [sendRequest, postId, setFormData]);

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedPost && error !== null) {
        return (
            <div className="center">
                <Card><h2>Could not find place</h2></Card>
            </div>
        )
    }

    return (
        <React.Fragment>
        {error !== null && <ErrorModal error={error} onClear={clearError} />} 
        <Card className="update-post">
            <h2>Edit Post</h2>
            <hr />
            {!isLoading && loadedPost && (<form className="place-form" onSubmit={postSubmitHandler}>
                <Input
                    element="input"
                    id="title"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Title is required."
                    onInput={inputHandler}
                    initialValue={loadedPost.title}
                    initialValid={true}
                />
                <Input
                    element="input"
                    id="caption"
                    type="text"
                    label="Caption"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Caption is required."
                    onInput={inputHandler}
                    initialValue={loadedPost.caption}
                    initialValid={true}
                />
                <Input
                    element="input"
                    id="address"
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Address is required."
                    onInput={inputHandler}
                    initialValue={loadedPost.address}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>Update</Button>
            </form>)}
        </Card>
        </React.Fragment>
       
    )
};

export default UpdatePost;