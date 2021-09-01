import React, { useState, useEffect } from 'react';
import './profile-style.css'
import Feed from '../components/Feed';
import People from '../components/People';
import Listing from '../components/Listing';
import qs from 'qs';

function mapHashtagsToListingItems(hashtags) {
    return hashtags.map(hashtag => {
        return {
            content: "#" + hashtag.hashtag,
            url: "home?hashtag=" + hashtag.hashtag,
        };
    })
}

function HomeComponent(props) {

    const principalId = "f54af9c2-cd04-40fb-b4c8-d4aeab26c040";
    const url = "http://localhost:5000";
    const [posts, setPosts] = useState(null);
    const [hashtags, setHashtags] = useState([]);
    const [friends, setFriends] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.trim() === "") {
            setFilteredUsers(friends);
        } else {
            const fetchUsersWithSimilarName = async (name) => {
                await fetch(`${url}/users?name=${inputValue.toLowerCase()}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                })
                .then(res => res.json())
                .then(res => setFilteredUsers(res));
            }

            fetchUsersWithSimilarName(inputValue);
        }
    }

    const retrieveHashtag = () => {
        return qs.parse(props.location.search, { ignoreQueryPrefix: true }).hashtag;
    }

    useEffect(() => {
        const findPosts = async () => {
            await fetch(`${url}/posts/feed`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then(res => res.json())
            .then((res) => {
                setPosts(res);
            });
        }

        const findTrendyHashtags = async () => {
            await fetch(`${url}/hashtags?size=14`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then(res => res.json())
            .then((res) => {
                setHashtags(res);
            });
        }

        const findPostsByHashtag = async (tag) => {
            await fetch(`${url}/posts/hashtag?hashtag=${tag}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then(res => res.json())
            .then((res) => {
                setPosts(res);
            });
        }
        
        const findRandomUsers = async () => {
            await fetch(`${url}/users/random?size=14`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            })
            .then(res => res.json())
            .then((res) => {
                setFriends(res);
                setFilteredUsers(res);
            });
        }

        const hashtag = retrieveHashtag();

        findTrendyHashtags();
        if (hashtag) {
            findPostsByHashtag(hashtag);
        } else {
            findPosts();
        }
        findRandomUsers();
    }, []);

    return (
        <div className="outer-container">
            <div className="container">
                <div className="profile-info">
                    <div className="info-top">
                        <span className="hashtag-big">#</span>
                        {
                            retrieveHashtag() ? 
                            <h1>{ retrieveHashtag() }</h1> 
                            : (<div><p>Use hashtags to be found.</p> <p>Look for hashtags to find what you like.</p></div>)
                        }
                    </div>
                    <div className="info-hashtag">
                        <Listing items={ mapHashtagsToListingItems(hashtags) }></Listing>
                    </div>
                </div>
                <div className="profile-feed">
                    {
                        posts ?
                        (<Feed isHashtagPage={ retrieveHashtag() } posts={ posts } principalId={ principalId }></Feed>)
                        : (<div>Loading...</div>)
                    }
                </div>
                <div className="profile-friends">
                    <div className="friends-header">
                        <h3>Find people</h3>
                        <input type="text" placeholder="search for someone..." className="sn-text-box" onChange={ handleChange }/>
                    </div>
                    <People friends={ filteredUsers }></People>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;