
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { create } from "../utilities/user-api"
export default function GoogleAuth() {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    create(credentialResponse)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
};
