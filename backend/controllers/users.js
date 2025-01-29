const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

module.exports = {
    signIn,
    getUserByEmail,
    updateUser
};
async function signIn(req, res) {
    const { credential, client_id } = req.body;
    try {
        // Verify the ID token with Google's API
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });
        const payload = ticket.getPayload();

        const { email, given_name, family_name } = payload;
        let user = await User.findOne({ email: email });
        if (!user) {
            // Create a new user if they don't exist
            user = await User.create({
                email,
                name: `${given_name} ${family_name}`,
                authSource: 'google',
            });

        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h', // Adjust expiration time as needed
        });
        console.log("hit")

        // Send the token as a cookie and response
        res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: false, // Set to true in production when using HTTPS
                maxAge: 3600000, // 1 hour in milliseconds
            })
            .json({ message: 'Authentication successful', user });
    } catch (err) {
        console.error('Error during Google Authentication:', err);
        res.status(400).json({ error: 'Authentication failed', details: err });
    }
}
async function getUserByEmail(req, res) {
    try {
        res.status(200).json(await User.find({ email: req.params.email }));
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