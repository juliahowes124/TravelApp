import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

const POSTS = [
    {
        id: 'p1',
        title: 'Empire State Building',
        caption: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://cdn.getyourguide.com/img/location/5ca3484e4fa26.jpeg/148.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484,
            lng: -73.9857
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Great Wall of China',
        caption: 'A big wall!',
        imageUrl: 'https://www.snopes.com/tachyon/2018/07/great_wall_of_china.jpg?resize=865,452',
        address: 'Huairou District, China',
        location: {
            lat: 40.4319,
            lng: 116.5704
        },
        creator: 'u2'
    }
];

const UpdatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const postId = useParams().pid;

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

    const postSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    const identifiedPlace = POSTS.find(p => p.id  === postId);
    useEffect(() => {
        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                caption: {
                    value: identifiedPlace.caption,
                    isValid: true
                },
                address: {
                    value: identifiedPlace.address,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card><h2>Could not find place</h2></Card>
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
        <Card className="new-post">
            <h2>Edit Post</h2>
            <hr />
            <form className="place-form" onSubmit={postSubmitHandler}>
                <Input
                    element="input"
                    id="title"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Title is required."
                    onInput={inputHandler}
                    initialValue={formState.inputs.title.value}
                    initialValid={formState.inputs.title.isValid}
                />
                <Input
                    element="input"
                    id="caption"
                    type="text"
                    label="Caption"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Caption is required."
                    onInput={inputHandler}
                    initialValue={formState.inputs.caption.value}
                    initialValid={formState.inputs.caption.isValid}
                />
                <Input
                    element="input"
                    id="address"
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Address is required."
                    onInput={inputHandler}
                    initialValue={formState.inputs.address.value}
                    initialValid={formState.inputs.address.isValid}
                />
                <Button type="submit" disabled={!formState.isValid}>Update</Button>
            </form>
        </Card>
    )
};

export default UpdatePost;