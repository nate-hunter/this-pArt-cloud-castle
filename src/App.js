import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './app.css';

import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import PostModal from './components/post/PostModal';
import { AuthContext } from "./auth";


function App() {
  const { authState } = React.useContext(AuthContext);
  console.log('auth:', authState)
  const isAuth = authState.status === 'in';
  // const userId = isAuth ? authState.user.uid : null;
  // const variables = { userId };

  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location); // can keep track of the previous location visited
  const modal = location.state?.modal;

  React.useEffect(() => {
    if(history.action !== 'POP' && !modal) prevLocation.current = location 
  }, [location, modal, history.action])

  const isModalOpen = modal && prevLocation.current !== location;

  if (!isAuth) {
    return (
      <Switch>
        <Route path='/accounts/login' component={LoginPage} />
        <Route path='/accounts/emailsignup' component={SignupPage} />  
        <Redirect to="/accounts/login" />
      </Switch>
    )
  }

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/map" component={MapPage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignupPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path='/p/:postId' component={PostModal} />}
    </>
  );
}

export default App;
