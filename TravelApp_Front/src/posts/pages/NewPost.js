import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './NewPost.css';

const NewPost = () => {

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        caption: {
            value: '',
            isValid: false
        },
        imageUrl: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

    return (
        <Card className="new-post">
            <h2>New Post</h2>
            <hr />
            <form onSubmit="">
                <Input
                    element="input"
                    id="title"
                    type="text"
                    label="Title"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="caption"
                    type="text"
                    label="Caption"
                    onInput={inputHandler}
                />
                <Input
                    id="input"
                    element="imageUrl"
                    type="text"
                    label="Image Url"
                    // validators={[VALIDATOR_MINLENGTH(3)]}
                    // errorText="Password must be at lease 3 characters long."
                    onInput={inputHandler}
                />
                <Input
                    id="input"
                    element="address"
                    type="text"
                    label="Address"
                    // validators={[VALIDATOR_MINLENGTH(3)]}
                    // errorText="Password must be at lease 3 characters long."
                    onInput={inputHandler}
                />
                <Button type="submit">Post</Button>
            </form>
        </Card>
        
    ) 
};

export default NewPost;