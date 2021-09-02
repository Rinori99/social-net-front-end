import React, { useState } from 'react';
import './profile-style.css'
import Post from '../components/Post';

function FeedComponent(props) {

    const url = "http://localhost:5000";
    const newPostBoxElementId = "new-post-box";
    const [posts, setPosts] = useState(props.posts);

    const handleNewPostClick = () => {
        const newPost = {
            content: document.getElementById(newPostBoxElementId).innerText,
        }

        fetch(`${url}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(newPost),
        })
        .then(res => res.json())
        .then(res => {
            document.getElementById(newPostBoxElementId).innerText = "";
            setPosts([...posts, res]);
        })
    }

    return (
        <div>
            {
                (!props.isHashtagPage && !props.shouldHideCreatePostBox) ?
                (<div className="new-post-box">
                    <h3>Create new post</h3>
                    <p>
                        <span id={ newPostBoxElementId } className="post-item-edit-textbox new-post-box-edit" role="textbox" contentEditable></span>
                    </p>
                    <button className="sn-btn" onClick={ handleNewPostClick }>Post</button>
                </div>)
                : (<div></div>)
            }
            <div style={{ 
                    display: "flex",
                    flexDirection: "column-reverse",
                }}>
                {
                    posts ? 
                    (posts.map(post => {
                        return <Post post={ post } principalId={ props.principalId }></Post>
                    }))
                    : 
                    (<div>Loading posts...</div>)
                }
            </div>
        </div>
    );
}

export default FeedComponent;