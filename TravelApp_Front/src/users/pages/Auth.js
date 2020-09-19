import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
    const authMode = useParams().authMode;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm({
        username: {
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
            }, formState.inputs.username.isValid && formState.inputs.password.isValid);
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

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (authMode === 'login') {
            console.log('Logged In!')
        } else {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        username: formState.inputs.username.value,
                        password: formState.inputs.password.value
                    })
                });

                const responseData = await response.json();
                if (!response.ok) {
                    console.log('error occured');
                    throw new Error(responseData.message);
                }

                console.log(responseData);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again.');
            } 
        }
    };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            {error !== null && (<ErrorModal error={error} onClear={errorHandler} />)}
            <Card className="auth">
            {isLoading && <LoadingSpinner asOverlay/>}
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
                    id="username"
                    type="username"
                    label="Username"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a username."
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
                {authMode==='register' && (
                    <p>
                        Already have an account? 
                        <Link to="/auth/login"> Sign In</Link>
                    </p>
                    
                )}
                <Button type="submit" disabled={!formState.isValid}>{authMode==='login' ? 'LOGIN' : 'REGISTER'}</Button>
            </form>
        </Card>

        </React.Fragment>
        
        
    ) 
};

export default Auth;