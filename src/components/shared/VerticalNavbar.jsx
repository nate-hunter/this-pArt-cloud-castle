import React from 'react';
import { Link } from 'react-router-dom';


// This vertical navbar will contain links to:
// - The gallery page 
// - The map page 

// Additionally, it will contain dropdown lists of: (will be implemented secondary)
// - popular cities 
// - popular categories 
// - popular themes 
// - popular artists

// Would a search bar be useful here? Search for what? Would the header be a better location?

const VerticalNavbar = () => {
    return (
        <div>
            <Link to="/gallery"><h3>Gallery</h3></Link>
            <Link to="/map"><h3>Map</h3></Link>
            <hr/>
        </div>
    )
}

export default VerticalNavbar;
