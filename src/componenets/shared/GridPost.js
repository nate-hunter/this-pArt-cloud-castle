import React from 'react';
import { useHistory } from 'react-router-dom';

const GridPost = ({ post }) => {
    const history = useHistory();

    function handlePostModal() {
        history.push({
            pathname: `/p/${post.id}`,
            state: { modal: true }
        })
    }

    return (
        <div onClick={handlePostModal} style={{ border: "solid lightblue 2px" }}>
            <div style={{ border: "solid 1px" }}>
                (overlay): <span>{post.title} - {post.likes} | {post.comments.length}</span>
            </div>
            <img src={post.media} alt="Art piece" style={{ maxHeight: "100px" }} />
            <h4>{post.area}</h4>
        </div>
    )
}

export default GridPost;
