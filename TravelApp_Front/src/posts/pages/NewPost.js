import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
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
        address: {
            value: '',
            isValid: false
        }
    }, false); //title, caption, address are initialInputs; false is initialValidity

    const postSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <Card className="new-post">
            <h2>New Post</h2>
            <hr />
            <form className="post-form" onSubmit={postSubmitHandler}>
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
                <Button type="submit" disabled={!formState.isValid}>Post</Button>
            </form>
        </Card>
        
    ) 
};

export default NewPost;