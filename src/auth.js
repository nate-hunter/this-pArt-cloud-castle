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
    await firebase.auth().signInWithPopup(provider);
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

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          signInWithGoogle,
          signUpWithEmailAndPassword, 
          // logInWithEmailAndPassword,
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