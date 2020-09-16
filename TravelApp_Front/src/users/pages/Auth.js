import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../shared/util/validators';
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

    useEffect(() => {
        if (authMode === 'login') {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
    }, [authMode]);

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        if (authMode === 'login') {
            console.log('Logged In!')
        } else {
            console.log('Registration successful!')
        }
        auth.login();
    }
    return (
        <Card className="auth">
            <h2>{authMode==='login' ? 'LOGIN' : 'REGISTER'}</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {authMode === 'register' && (
                    <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                />
                )}
                
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(3)]}
                    errorText="Password must be at least 3 characters long."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{authMode==='login' ? 'LOGIN' : 'REGISTER'}</Button>
            </form>
        </Card>
        
    ) 
};

export default Auth;