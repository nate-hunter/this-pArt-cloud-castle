import React from 'react';
import Comment from '../shared/Comment';
import LikeButton from '../shared/LikeButton';
import SaveButton from '../shared/SaveButton';



const Post = () => {
    return (
        <div>
            <h3>A post...</h3>
            <LikeButton />
            <SaveButton />
            <Comment />
        </div>
    )
}

export default Post;


           
