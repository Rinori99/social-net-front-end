import React from 'react';
import './profile-style.css'
import profilepic from '../resources/images/profile.jpeg';

function PeopleComponent(props) {

    return (
        <div>
            <div className="friends-content">
                {
                    props.friends.map(friend => {
                        return (
                            <div className="friend-item">
                                <div className="friend-item-pic">
                                    <div className="image-container-friend">
                                        <img src={profilepic} className="profile-pic" />
                                    </div>
                                </div>
                                <div className="friend-item-name">
                                    <a href={ "/browse/profile/" + friend.id }>{ friend.firstName + " " + friend.lastName }</a>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default PeopleComponent;