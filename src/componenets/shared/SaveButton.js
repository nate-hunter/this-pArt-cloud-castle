import React from 'react';

const SaveButton = () => {
    const [saved, setSaved] = React.useState(false);
    const icon = saved ? "unsaved icon" : "saved icon";
    const className = saved ? "saved" : "unsaved";
    const onClick = saved ? handleUnsave : handleSave;

    function handleUnsave() {
        console.log('handle unsave clicked')
        setSaved(false);
    }
    
    function handleSave() {
        console.log('handle save clicked')
        setSaved(true);
        
    }

    const btnText = saved ? "Unsave Art" : "Save Art";

    return (
        <div>
            <button className={className} onClick={onClick}>{btnText}</button>
        </div>
    )
}

export default SaveButton;
