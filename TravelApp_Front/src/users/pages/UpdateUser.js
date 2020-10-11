import React, {useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './UpdateUser.css';

const UpdateUser = () => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    const auth = useContext(AuthContext);
    const history = useHistory();
    const userId = auth.userId;

    const [formState, inputHandler, setFormData] = useForm({
        name: {
            value: '',
            isValid: false
        }
    }, false);

    const postSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/users/${userId}`,
            'PATCH',
            JSON.stringify({
            name: formState.inputs.name.value,
            }),
            {
                Authorization: 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
            });
            history.push('/') ;
        } catch (err) {}
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${userId}`);
                setLoadedUser(responseData.user);
                setFormData({
                    name: {
                        value: responseData.user.name,
                        isValid: true
                    }
                })
            
             } catch(err) {}
         };
        fetchUser();
    }, [sendRequest, userId, setFormData]);

    if (!loadedUser) {
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