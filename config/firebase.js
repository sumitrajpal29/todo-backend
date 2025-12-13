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
        // Fallback to env vars (legacy) or just error out
        console.warn('Warning: serviceAccountKey.json not found. Trying env vars...');
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
            }),
        });
        console.log('Firebase Admin Initialized with ENV keys');
    }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

module.exports = admin;
