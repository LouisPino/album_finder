
import React from 'react';
import { create } from "../utilities/user-api"
import { useGoogleLogin } from '@react-oauth/google';


export default function GoogleAuth({ user, setUser, clientId }) {
    console.log("log", client)

    const login = useGoogleLogin({
        flow: "auth-code", // Ensures the response includes an ID token
        onSuccess: async (credentialResponse) => {
            credentialResponse.client_id = clientId
            console.log(credentialResponse)
            const res = await create(credentialResponse);
            const user = res.user;
            setUser(user);
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    return (
        <button className="login-btn" onClick={() => login()}>Sign In</button>
    );
};