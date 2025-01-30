
import React from 'react';
import { create } from "../utilities/user-api"
export default function GoogleAuth({ user, setUser, useGoogleLogin, clientId }) {
    const login = useGoogleLogin({
        flow: "implicit", // Ensures the response includes an ID token
        onSuccess: async (credentialResponse) => {
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