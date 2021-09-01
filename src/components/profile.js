import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profile-style.css'
import profilepic from '../resources/images/profile.jpeg';
import Feed from '../components/Feed';
import People from '../components/People';
import Listing from '../components/Listing';

function mapActivitiesToListingItems(activities) {
    return activities.map(activity => {
        return {
            content: (activity.commitedBy ? activity.commitedBy.firstName : "NONAME") + " " + (activity.type == "LIKE" ? "likes a post" : "became friends with ") + (activity.targetUser? activity.targetUser.firstName : "") + ".",
            url: null,
        }
    });
}

function ProfileComponent() {
    const principalId = "f54af9c2-cd04-40fb-b4c8-d4aeab26c040";
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
        return !id || currentUser.id == id;
    }

    const isMyFriend = () => {
        return isMyConnection;
    }

    const getId = () => {
        return isMyProfile() ? currentUser.id : id;
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
        const findPrincipalAndUser = async () => {
            const currentUserRes = await fetch(`${url}/users/current`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            }).then((res) => res.json());
            setCurrentUser(currentUserRes);

            if (isMyProfile()) {
                setUser(currentUser);
            } else {
                const userRes = await fetch(`${url}/users/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                }).then((res) => res.json());
                setUser(userRes);
            }
        }
        findPrincipalAndUser();
        // const findUser = async () => {
        //     await fetch(`${url}/users/${id}`, {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        //     })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setUser(res);
        //     });
        // };
        // if (isMyProfile()) {
        //     setUser(currentUser);
        // } else {
        //     findUser();
        // }
        // const findActivities = async () => {
        //     await fetch(`${url}/activities?userId=${getId()}`, {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        //     })
        //     .then((res) => res.json())
        //     .then((res) => { 
        //         setActivities(res);
        //     });
        // }
        // findActivities();
        // const findPosts = async () => {
        //     await fetch(`${url}/posts?userId=${getId()}`, {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        //     })
        //     .then(res => res.json())
        //     .then((res) => {
        //         setPosts(res);
        //     });
        // }
        // findPosts();
        // const findFriends = async () => {
        //     await fetch(`${url}/users/${getId()}/friends`, {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        //     })
        //     .then(res => res.json())
        //     .then((res) => {
        //         setFriends(res);
        //         setFilteredFriends(res);
        //     });
        // }
        // findFriends();
        // if (!isMyProfile()) {
        //     const checkIfIsMyFriend = async () => {
        //         await fetch(`${url}/users/${id}/friends-with/${currentUser.id}`, {
        //             method: 'GET',
        //             headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        //         })
        //         .then(res => res.json())
        //         .then((res) => {
        //             setIsMyConnection(res.isConnected);
        //         })
        //     }
        //     checkIfIsMyFriend();
        // }
    },[]);

    const isDataReady = () => {
        return currentUser && user && posts && friends;
    }

    return (
        <div className="outer-container">
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
                        <Feed posts={ posts } principalId={ principalId } shouldHideCreatePostBox={ !isMyProfile() }></Feed>
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
            
        </div>
    );
}

export default ProfileComponent;