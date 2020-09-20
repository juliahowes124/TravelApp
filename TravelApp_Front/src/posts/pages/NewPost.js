import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './NewPost.css';

const NewPost = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError} = useHttpClient();

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
        },
        image: {
            value: null,
            isValid: false
        }
    }, false); //title, caption, address are initialInputs; false is initialValidity

    const history = useHistory();

    const postSubmitHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value );
            formData.append('caption', formState.inputs.caption.value );
            formData.append('address', formState.inputs.address.value );
            formData.append('creator', auth.userId );
            formData.append('image', formState.inputs.image.value);
            
            await sendRequest('http://localhost:5000/api/posts', 'POST', formData);
            history.push('/');
        } catch (err) {
        }
    }

    return (
        <React.Fragment>
            {error !== null && <ErrorModal error={error} onClear={clearError} />}
            <Card className="new-post">
            <h2>New Post</h2>
            <hr />
            <form className="post-form" onSubmit={postSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    element="input"
                    id="title"
                    type="text"
                    label="Title"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a title"
                />
                <Input
                    element="input"
                    id="caption"
                    type="text"
                    label="Caption"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a description"
                />
                <Input
                    element="input"
                    id="address"
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image" />
                <Button type="submit" disabled={!formState.isValid}>Post</Button>
            </form>
            </Card>
        </React.Fragment>
        
        
    ) 
};

export default NewPost;