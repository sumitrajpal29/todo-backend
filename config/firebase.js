const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');

try {
    if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = require(serviceAccountPath);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase Admin Initialized with serviceAccountKey.json');
    } else {
        console.error('Error: serviceAccountKey.json not found!');
        // Throwing error to fail fast if file is missing (since user expects file to exist)
        throw new Error('serviceAccountKey.json is required but missing.');
    }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

module.exports = admin;
