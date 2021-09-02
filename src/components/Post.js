import React, { useState, useEffect } from 'react';
import './profile-style.css'
import profilepic from '../resources/images/profile.jpeg';
import blueHeartIcon from '../resources/icons/heart-blue.svg';
import redHeartIcon from '../resources/icons/heart-red.svg';

function PostComponent(props) {
    const postUrl = "http://localhost:5000/posts";
    const likeUrl = "http://localhost:5000/likes";

    const [isEditMode, setEditMode] = useState(false);
    const [likesCount, setlikesCount] = useState(parseInt(props.post.likes));
    const [isLikedByMe, setIsLikedByMe] = useState(props.post.isLikedByMe);
    const [content, setContent] = useState(props.post.content);

    const isLoggedInUsersPost = (postedBy) => {
        return postedBy === props.principalId;
    }

    const handleEditClick = () => {
        setEditMode(true);

    }

    const updatePostContent = async (content) => {
        await fetch(`${postUrl}/${props.post.id}/content`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify({ content: content }),
        });
    }

    const handleSubmitClick = () => {
        const content = document.getElementById(`post-content-${props.post.id}`).innerText;
        updatePostContent(content);
        setContent(content);
        setEditMode(false);
    }

    const likePost = async (postId) => {
        await fetch(`${likeUrl}?postId=${postId}`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            method: 'POST',
        });
    }

    const unlikePost = async (postId) => {
        await fetch(`${likeUrl}?postId=${postId}`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            method: 'DELETE',
        });
    }

    const handleLikeClick = () => {
        if (isLikedByMe) {
            unlikePost(props.post.id);
            setlikesCount(likesCount - 1);
        } else {
            likePost(props.post.id);
            setlikesCount(likesCount + 1);
        }
        setIsLikedByMe(!isLikedByMe);
    }

    return (
        <div className="post-item">
            <div className="post-item-header">
                <div className="friend-item-pic">
                    <div className="image-container-friend">
                        <img src={profilepic} className="profile-pic" />
                    </div>
                </div>
                <div className="post-item-user-name">
                    <span className="post-item-name">{ props.post.postedBy.firstName + " " + props.post.postedBy.lastName } <span> • { new Date(props.post.dateCreated).getFullYear() }</span></span>
                </div>
                {   
                    (isLoggedInUsersPost(props.post.postedBy.id)) ? (
                    (!isEditMode) ?
                    (<button className="sn-btn post-item-edit" onClick={ handleEditClick }>edit</button>)
                    : (<button className="sn-btn post-item-submit" onClick={ handleSubmitClick }>submit</button>))
                    : <div></div>
                } 
            </div>

            <div className="post-item-content">
                {
                    isEditMode ? 
                    (<p><span id={ `post-content-${props.post.id}` } className="post-item-edit-textbox" role="textbox" contentEditable>{ content }</span></p>)
                    : (<p>{ content }</p>)
                }
            </div>
            <div className="post-item-footer">
                <img src={isLikedByMe ? redHeartIcon : blueHeartIcon} className="post-like-btn" id="like-btn" onClick={ handleLikeClick }/>
                <span className="likes-count">{ likesCount }</span>
            </div>
        </div>
    )
}

export default PostComponent;