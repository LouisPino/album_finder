
import React from 'react';
import { create } from "../utilities/user-api"
export default function GoogleAuth({ user, setUser, useGoogleLogin }) {
    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            const res = await create(credentialResponse);
            const user = res.user;
            setUser(user);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <button className="login-btn" onClick={login}>Sign In</button>
    );
};