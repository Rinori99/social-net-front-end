import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/style.css';
import profilepic from '../resources/images/profile.jpeg';
import Feed from './Feed';
import People from './People';
import Listing from './Listing';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function mapActivitiesToListingItems(activities) {
    return activities.map(activity => {
        return {
            content: (activity.commitedBy ? activity.commitedBy.firstName : "NONAME") + " " + (activity.type == "LIKE" ? "likes a post" : "became friends with ") + (activity.targetUser? activity.targetUser.firstName : "") + ".",
            url: null,
        }
    });
}

function ProfileComponent() {
    const url = "http://localhost:5000";
    const [activities, setActivities] = useState([]);
    const [posts, setPosts] = useState(null);
    const [friends, setFriends] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [user, setUser] = useState(null);
    const [isMyConnection, setIsMyConnection] = useState(false);

    const { id } = useParams();

    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.trim() === "") {
            setFilteredFriends(friends);
        } else {
            setFilteredFriends(friends.filter(friend => {
                const inputValueLowerCase =  inputValue.toLowerCase();
                const friendFirstName = friend.firstName.toLowerCase();
                const friendLastName = friend.lastName.toLowerCase();

                return friendFirstName.includes(inputValueLowerCase) || friendLastName.includes(inputValueLowerCase)
                        || inputValueLowerCase.includes(friendFirstName) || inputValueLowerCase.includes(friendLastName);
            }));
        }
    }

    const isMyProfile = () => {
        return !id;
    }

    const isMyFriend = () => {
        return isMyConnection;
    }

    const handleFriendshipButtonClick = () => {
        if (isMyConnection) {
            const removeFriend = async () => {
                await fetch(`${url}/users/connection`, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                    body: JSON.stringify({
                        friendId: id,
                    }),
                })
                .then(() => setIsMyConnection(false));
            }
            removeFriend();
        } else {
            const addFriend = async () => {
                await fetch(`${url}/users/connection`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                    body: JSON.stringify({
                        friendId: id,
                    }),
                })
                .then(() => setIsMyConnection(true));
            }
            addFriend();
        }
    }

    useEffect(() => { 
        const findUpfrontData = async () => {
            if (id) {
                await fetch(`${url}/users/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                })
                .then((res) => res.json())
                .then((res) => setUser(res));
            } else {
                await fetch(`${url}/users/current`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                })
                .then(res => res.json())
                .then(res => setUser(res));
            }

            const activitiesRes = await fetch(url + '/activities' + ( id ? `?userId=${id}` : '' ), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then((res) => res.json());
            setActivities(activitiesRes);

            const postsRes = await fetch(url + '/posts' + ( id ? `?userId=${id}` : '' ), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then(res => res.json());
            setPosts(postsRes);

            const friendsRes = await fetch(url + '/users/friends' + ( id ? `?userId=${id}` : '' ), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then(res => res.json());
            setFriends(friendsRes);
            setFilteredFriends(friendsRes);
        }
        findUpfrontData();
        
        if (!isMyProfile()) {
            const checkIfIsMyFriend = async () => {
                await fetch(`${url}/users/${id}/my-friend`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                })
                .then(res => res.json())
                .then((res) => {
                    setIsMyConnection(res.isConnected);
                })
            }
            checkIfIsMyFriend();
        }
    },[]);

    const isDataReady = () => {
        return user && posts && friends && activities;
    }

    return (
        localStorage.getItem('token') ? (<div className="outer-container">
            {
                isDataReady() ? 
                (<div className="container">
                    <div className="profile-info">
                        <div className="info-top">
                            <div className="image-container">
                                <img src={profilepic} className="profile-pic" />
                            </div>
                            <div className="info-name">
                                { user.firstName + " " + user.lastName }
                            </div>
                            { 
                                isMyProfile() ? (<div>(me)</div>) : 
                                (isMyFriend() ? (<button onClick={ handleFriendshipButtonClick } className="add-friend sn-btn">Remove friend</button>) 
                                : (<button onClick={ handleFriendshipButtonClick } className="add-friend sn-btn">Add friend</button>))
                            }
                        </div>
                        <div className="info-center">
                            <div className="user-info-container">
                                <p>{ "Year born : " + new Date(user.birthdate).getFullYear() }</p>
                                <p>{ "Hobby: " + user.hobby }</p>
                                <p>{ "Living in: " + user.livingIn }</p>
                                <p>{ "Works at: " + user.workingAt }</p>
                                <p>{ "Education: " + user.education }</p>
                            </div>
                        </div>
                        <div className="info-activity">
                            <Listing items={ mapActivitiesToListingItems(activities) }></Listing>
                        </div>
                    </div>
                    <div className="profile-feed">
                        <Feed posts={ posts } principalId={ localStorage.getItem('token') } shouldHideCreatePostBox={ !isMyProfile() }></Feed>
                    </div>
                    <div className="profile-friends">
                        <div className="friends-header">
                            <h3>{ user.firstName + "'s friends" }</h3>
                            <input type="text" placeholder="search a friend..." className="sn-text-box" onChange={ handleChange } />
                        </div>
                        <People friends={ filteredFriends }></People>
                    </div>
                </div>) : (<div>Loading...</div>)
            }
        </div> ) : (<Redirect to="/login"></Redirect>)
    );
}

export default ProfileComponent;