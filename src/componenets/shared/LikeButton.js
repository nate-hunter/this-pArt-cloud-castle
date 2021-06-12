import React from 'react';

const LikeButton = () => {
    const [liked, setLiked] = React.useState(false);
    const icon = liked ? "unlike icon" : "like icon";
    const className = liked ? "liked" : "unliked";
    const onClick = liked ? handleUnlike : handleLike;

    function handleUnlike() {
        console.log('handle unlike clicked')
        setLiked(false);
    }
    
    function handleLike() {
        console.log('handle like clicked')
        setLiked(true);
        
    }

    const btnText = liked ? "Unlike Art" : "Like Art";

    return (
        <div>
            <button className={className} onClick={onClick}>{btnText}</button>
        </div>
    )
}

export default LikeButton;
