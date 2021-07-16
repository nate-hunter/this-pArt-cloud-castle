import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import Layout from '../components/shared/Layout';

import { Avatar, Button, Card, CardContent, Dialog, DialogTitle, Divider, Hidden, Typography, Zoom } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import { Link, useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { AuthContext } from '../auth';


const ProfilePage = () => {
  const [showOptionsMenu, setOptionsMenu] = useState(false);
  const { me } = useContext(UserContext);

  const handleOptionsMenuClick = () => {
    setOptionsMenu(true);
  }

  function handleCloseMenu() {
    setOptionsMenu(false);
  }

  return (
    <Layout title={`${me.name} (@${me.username})`}>
      <h2>Profile page...</h2>

      <div className='profile-container'>
        <Hidden xsDown>
          <Card className='cardLarge'>
            <h3>avatar: </h3>
            <img
              style={{ maxHeight: '200px', borderRadius: '15px' }}
              src={me.avatar}
              alt='profile-pic'
            />
            <CardContent className='cardContentLarge'>
              <h3>user: {me.username}</h3>
              <h3>bio: {me.bio}</h3>
              <h3>12 posts</h3>
              <a href={me.website} target="_blank" rel="noreferrer noopener">{me.website}</a>

              <div onClick={handleOptionsMenuClick} style={{ cursor: 'pointer', margin: '15px' }}>
                <SettingsIcon />
              </div>

              <Link to='/accounts/edit'>
                <Button
                  variant='outlined'
                  style={{ backgroundColor: 'lightseagreen', color: 'white' }}
                >
                  Edit Profile
                </Button>
              </Link>
              {/* <ProfileNameSection
                user={user}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              /> */}
              {/* <PostCountSection user={user} /> */}
              {/* <NameBioSection user={user} /> */}
            </CardContent>
          </Card>
        </Hidden>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        <Hidden smUp></Hidden>
      </div>
    </Layout>
  );
};

export default ProfilePage;

const OptionsMenu = ({ handleCloseMenu }) => {
  // const classes = useProfilePageStyles();
  const { signOut } = React.useContext(AuthContext); 
  const [showLogOutMessage, setLogOutMessage] = React.useState(false);
  const history = useHistory();
  const client = useApolloClient();

  function handleLogOutClick() {
    setLogOutMessage(true);
    setTimeout(async () => {
      await client.clearStore();
      signOut();
      history.push('/accounts/login');
    }, 1000);
  }

  return (
    <Dialog
      open 
      // classes={{
      //   scrollPaper: classes.dialogScrollPaper,
      //   paper: classes.dialogPaper
      // }} 
      // TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className='dialogTitle'>
          Logging Out
          <Typography color='textSecondary'>
            You need to log back in to continue
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} textColor={'red'} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  )
}

const OptionsItem = ({ text, onClick, textColor }) => {
  return (
    <>
      <Button style={{ padding: '12px 150px', color: textColor }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  )
}
