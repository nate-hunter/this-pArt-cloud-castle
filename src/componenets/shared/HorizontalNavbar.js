import React from 'react'
import { Link } from 'react-router-dom';


const HorizontalNavbar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/"><h1>this pArt</h1></Link></li>
                <li>login/logout</li>
            </ul>
            <hr/>
        </div>
    )
}

export default HorizontalNavbar
