import React from 'react';


const defaultComments = [
    "one comment",
    "another comment"
]

const Comment = () => {
    const [content, setContent] = React.useState('');
    const [comments, setComments] = React.useState(defaultComments);

    const displayComments = comments ?  comments.map(comment => {
        return (
            <ul>
                <li>{comment}</li>
            </ul>
        )
    }) : null;

    const handleAddComment = () => {
        console.log('click')
        const updatedComments = comments.push(content);
        console.log(updatedComments);   
        setComments(updatedComments);
    }

    const btnDisplay = content ? "" : "disabled";

    return (
        <div>
            <h3>Comments...</h3>

            <input type="textarea" placeholder="Add comment..." onChange={(e) => setContent(e.target.value)} />
            <button disabled={btnDisplay} onClick={handleAddComment}>Post Comment</button>
            {displayComments}
        </div>
    )
}

export default Comment;
