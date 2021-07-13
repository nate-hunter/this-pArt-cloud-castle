import React, { useContext } from 'react'
import { UserContext } from '../App'

const ProfilePage = () => {
  const { me } = useContext(UserContext);
    return (
        <div>
            <h2>Profile page...</h2>
            <h3>user: {me.username}</h3>
            <h3>avatar: </h3>
            <img style={{ maxHeight: '200px' }} src={me.avatar} alt="profile-pic" />
        </div>
    )
}

export default ProfilePage
