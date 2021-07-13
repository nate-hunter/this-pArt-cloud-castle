import React, { useContext } from 'react';
import { UserContext } from '../App';

const EditProfilePage = () => {
  const { me } = useContext(UserContext);

    return (
        <div>
          Edit profile page...
          user: {me.username}
          avatar: {me.avatar}

        </div>
    )
}

export default EditProfilePage
