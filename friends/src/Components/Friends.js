import React from 'react';
import './Friends.css'

const Friends = (props) => {
    return (
        <div className='container-friends'>
            <h1>{props.friend.name}</h1>
            <img className='info-image' src={props.friend.image} alt='Friend Icon' />
            <div className='info-box'>
                <h2 className='info'>Birthday: {props.friend.birthday}</h2>
                <h2 className='info'>Species: {props.friend.species}</h2>
            </div>
            <button className='info update' value={[props.friend.id, props.friend.name, props.friend.image, props.friend.birthday, props.friend.species]} onClick={props.update}>Update Friend</button>
            <button className='info delete' value={props.friend.id} onClick={props.delete}>Delete Friend</button>
        </div>
    )
}

export default Friends;