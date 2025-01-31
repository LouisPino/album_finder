const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BASE_URL = process.env.BASE_URL
const CLIENT_SECRET = process.env.CLIENT_SECRET
const client = new OAuth2Client({
    clientId: GOOGLE_CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: `postmessage`
});

module.exports = {
    signIn,
    getUserById,
    updateUser
};

async function signIn(req, res) {
    const { code, client_id } = req.body;
    try {
        // Step 1: Get the tokens by exchanging the code
        const { tokens } = await client.getToken({
            code: code
        });
        console.log("tokens", tokens);  // Log tokens to inspect them

        // Step 2: Verify the ID token to get user information
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,  // Use the ID token received in the OAuth flow
            audience: client_id,       // Make sure the audience matches your client ID
        });

        const payload = ticket.getPayload();  // Contains user details
        console.log("payload", payload);

        const { email, given_name, family_name } = payload;

        // Step 3: Check if the user already exists in the database
        let user = await User.findOne({ email: email });

        if (!user) {
            // Step 4: Create a new user if they don't exist
            user = await User.create({
                email,
                name: `${given_name} ${family_name}`,
                authSource: 'google',  // You can store the auth source (Google) for reference
            });
        }

        // Step 5: Respond to the client with user information
        res.status(200).json({
            message: 'Authentication successful',
            user,
            tokens,  // Optionally, send back the tokens if needed (access token, refresh token, etc.)
        });

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed', error: error.message });
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