import React, { useContext } from 'react';
import { UserContext } from '../App';
import Layout from '../components/shared/Layout';



const ProfilePage = () => {
  const { me } = useContext(UserContext);
    return (
        <Layout>
            <h2>Profile page...</h2>
            <h3>user: {me.username}</h3>
            <h3>avatar: </h3>
            <img style={{ maxHeight: '200px' }} src={me.avatar} alt="profile-pic" />
        </Layout>
    )
}

export default ProfilePage
