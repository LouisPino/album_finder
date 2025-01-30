
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { create } from "../utilities/user-api"
export default function GoogleAuth({ user, setUser }) {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    const res = await create(credentialResponse)
                    const user = res.user
                    setUser(user)
                }
                }
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider >
    );
};
