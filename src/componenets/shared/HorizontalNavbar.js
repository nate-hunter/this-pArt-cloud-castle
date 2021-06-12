import React from 'react'
import { Link } from 'react-router-dom';
import { defaultCurrentUser } from '../../data';

// This horizontal navbar will contain:
// - The name of app or logo in the upper left hand corner  ->  links to the homepage 
// - Username + avatar  ->  links to the user's profile page
// - Authoriztion status in the upper right corner  ->  links to login or logout depending on status 
// - Notifications (if/when notifications are set up)
// - An animated loading bar at the top using '@tanem/react-nprogress';'

const HorizontalNavbar = ({ minimalNavbar }) => {

    // const history = useHistory();
    // const path = history.location.pathname;

    const loggedIn = defaultCurrentUser;
    
    const userInfo = <Link to={`/${defaultCurrentUser.username}`} ><h4>{defaultCurrentUser.username}</h4><img style={{ maxHeight: "50px" }} src={defaultCurrentUser.avatar} alt="user-avatar" /></Link>

    const authStatus = loggedIn 
        ? (
            <>
                {userInfo}
                <Link to="/"><h2>Logout</h2></Link>
            </>
        )
        : <Link to="/accounts/login"><h2>Login</h2></Link>


    return (
        <div className="topnav">
            <Link to="/"><h1>this pArt</h1></Link>
            {!minimalNavbar && authStatus}
            <hr/>
        </div>
    )
}

export default HorizontalNavbar
