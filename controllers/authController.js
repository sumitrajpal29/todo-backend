const User = require('../models/User');

// Sync User (Create or Update user in MongoDB after Firebase login)
exports.syncUser = async (req, res) => {
    try {
        const { uid, email, name } = req.user; // Decoded token from middleware

        let user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            // Create new user
            user = await User.create({
                firebaseUid: uid,
                email,
                displayName: name
            });
        } else if (user.email !== email || user.displayName !== name) {
            // Update existing user info if changed
            // Only update if email is present (some providers might not return email)
            if (email) user.email = email;
            if (name) user.displayName = name;
            await user.save();
        }

        res.json({ message: 'User synced', userId: user._id, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
