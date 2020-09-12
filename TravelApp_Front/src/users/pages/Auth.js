import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
    const authMode = useParams().authMode;
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }
    return (
        <Card className="auth">
            <h2>{authMode==='login' ? 'LOGIN' : 'REGISTER'}</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                <Input
                    element="input"
                    id="username"
                    type="text"
                    label="Username"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email"
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    // validators={[VALIDATOR_MINLENGTH(3)]}
                    // errorText="Password must be at lease 3 characters long."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{authMode==='login' ? 'LOGIN' : 'REGISTER'}</Button>
            </form>
        </Card>
        
    ) 
};

export default Auth;