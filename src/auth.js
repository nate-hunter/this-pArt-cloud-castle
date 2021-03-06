import { useMutation } from "@apollo/react-hooks";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { useState, useEffect, createContext } from "react";
// import App from "./App";

import { defaultUserImage } from "./data";
import { CREATE_USER } from "./graphql/mutations";

/* Authentication steps followed by the following blog:
 * https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/
*/

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID
});

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ status: 'loading' });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on('value', async (data) => {
            if(!data.exists) return
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    const userData = await firebase.auth().signInWithPopup(provider);

    if (userData.additionalUserInfo.isNewUser) {
      console.log('is new user???', { userData })
      const { uid, displayName, email, photoURL } = userData.user
      const username = `${displayName.replace(/\s+/g, "")}${uid.slice(-5)}}`
      const variables = {
        userId: uid,
        name: displayName,
        username,
        email,
        bio: '',
        website: '',
        avatar: photoURL
      };
      await createUser({ variables });
    }
  };

  const signUpWithEmailAndPassword = async formData => {
    const userData = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);
    if (userData.additionalUserInfo.isNewUser) {
      const variables = {
        userId: userData.user.uid,
        name: formData.name,
        username: formData.username,
        email: userData.user.email,
        bio: '',
        website: '',
        avatar: defaultUserImage
      };
      console.log(userData, variables)
      await createUser({ variables })
    }
  }

  const signOut = async () => {
    setAuthState({ status: "loading" });
    await firebase.auth().signOut();
    setAuthState({ status: 'out' });
  };

  const logInWithEmailAndPassword = async (username, password) => {
    const loggedInUser = await firebase.auth().signInWithEmailAndPassword(username, password)
    return loggedInUser;
  }

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          signInWithGoogle,
          signUpWithEmailAndPassword, 
          logInWithEmailAndPassword,
          signOut,
          // updateEmail
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;