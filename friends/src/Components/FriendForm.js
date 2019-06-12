import React from 'react';
import './Friends.css'

const FriendForm = ({name, image, birthday, species, changeHandler, submit}) => {
    return (
        <div className='header-div'>
            <h1>Add a Friend!</h1>
        <form onSubmit={submit} className='friend-form'>
            <h2>Name:
            <input
            className='friend-input'
            type='text'
            value={name}
            name='name'
            placeholder='name'
            onChange={changeHandler}
            />
            </h2>
            <h2>Image Url:
            <input
            className='friend-input'
            type='text'
            value={image}
            name='image'
            placeholder='Image Url'
            onChange={changeHandler}
            />
            </h2>
            <h2>Birthday:
            <input
            className='friend-input'
            type='text'
            value={birthday}
            name='birthday'
            placeholder='birthday'
            onChange={changeHandler}
            />
            </h2>
            <h2>Species:
            <input
            className='friend-input'
            type='text'
            value={species}
            name='species'
            placeholder='species'
            onChange={changeHandler}
            />
            <button className='friend-button' type='submit'>Submit</button>
            </h2>
        </form>
        </div>
    )
}

export default FriendForm;