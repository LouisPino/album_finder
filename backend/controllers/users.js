const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BASE_URL = process.env.BASE_URL
const CLIENT_SECRET = process.env.CLIENT_SECRET
const client = new OAuth2Client({
    clientId: GOOGLE_CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: `${BASE_URL}/oauth`
});

module.exports = {
    signIn,
    getUserById,
    updateUser
};
// async function signIn(req, res) {
//     const { code, client_id } = req.body;
//     console.log("body", req.body)
//     console.log("credential", credential)
//     try {
//         // Verify the ID token with Google's API
//         const ticket = await client.verifyIdToken({
//             idToken: code,
//             audience: client_id,
//         });
//         const payload = ticket.getPayload();
//         console.log("payload", payload)
//         console.log("email", email)
//         const { email, given_name, family_name } = payload;
//         let user = await User.findOne({ email: email });
//         if (!user) {
//             // Create a new user if they don't exist
//             user = await User.create({
//                 email,
//                 name: `${ given_name } ${ family_name }`,
//                 authSource: 'google',
//             });

//         }
//         res.status(200).json({ message: 'Authentication successful', user });

//     } catch (err) {
//         console.error('Error during Google Authentication:', err);
//         res.status(400).json({ error: 'Authentication failed', details: err });
//     }
// }

async function signIn(req, res) {
    const { code, client_id } = req.body;
    try {
        const { tokens } = await client.getToken({
            code,
            redirect_uri: `https://sixper-09b5db983bf5.herokuapp.com/auth/google_oauth2/callback`,
            client_id: client_id,
            grant_type: "authorization_code"

        });

        console.log(tokens);  // Log tokens to inspect them
        res.json(tokens);  // Send tokens back to the frontend

    } catch (err) {
        console.error('Error during Google Authentication:', err);
        res.status(400).json({ error: 'Authentication failed', details: err });
    }
}


async function getUserById(req, res) {
    try {
        res.status(200).json(await User.find({ id: req.params.id }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        res.status(200).json(await User.findByIdAndUpdate(req.params.id, req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}