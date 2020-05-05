import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../App'


const Login = () => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/restaurant",
    callbacks: {
      signInSuccessWithAuthResult: () => {
        alert("Successfully logged in.");
        return true;
      }
    }
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default Login;
