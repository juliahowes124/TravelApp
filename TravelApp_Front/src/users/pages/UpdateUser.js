import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './UpdateUser.css';

const USERS = [
    {
        id: 'u1',
        name: 'Julia Howes',
        email: 'julia.howes@gmail.com',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        places: 3
    },
    {
        id: 'u2',
        name: 'Neil Schultz-Cox',
        email: 'neil@gmail.com',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        places: 2
    }
];

const UpdateUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useParams().uid;

    const [formState, inputHandler, setFormData] = useForm({
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        }
    }, false);

    const postSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    const identifiedUser = USERS.find(u => u.id  === userId);
    useEffect(() => {
        if (identifiedUser) {
            setFormData({
                name: {
                    value: identifiedUser.name,
                    isValid: true
                },
                email: {
                    value: identifiedUser.email,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedUser]);

    if (!identifiedUser) {
        return (
            <div className="center">
                <Card><h2>Could not find user</h2></Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <Card className="update-user">
            <h2>Edit Info</h2>
            <hr />
            <form className="place-form" onSubmit={postSubmitHandler}>
                <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="A name is required."
                    onInput={inputHandler}
                    initialValue={formState.inputs.name.value}
                    initialValid={formState.inputs.name.isValid}
                />
                <Input
                    element="input"
                    id="email"
                    type="text"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="A valid email is required."
                    onInput={inputHandler}
                    initialValue={formState.inputs.email.value}
                    initialValid={formState.inputs.email.isValid}
                />
                <Button type="submit" disabled={!formState.isValid}>Update</Button>
            </form>
        </Card>
    )
};

export default UpdateUser;