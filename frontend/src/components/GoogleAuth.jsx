
import React from 'react';
import { create } from "../utilities/user-api"
import { useGoogleLogin } from '@react-oauth/google';


export default function GoogleAuth({ user, setUser, clientId, alertUser }) {
    function handleSignInClick() {
        const res = alertUser();
        if (res === "success") { login() }
    }
    const login = useGoogleLogin({
        flow: "auth-code", // Ensures the response includes an ID token
        onSuccess: async (credentialResponse) => {
            credentialResponse.client_id = clientId
            const res = await create(credentialResponse);
            const user = res.user;
            setUser(user);
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    return (
        <button className="login-btn" onClick={handleSignInClick}>Sign In</button>
    );
};