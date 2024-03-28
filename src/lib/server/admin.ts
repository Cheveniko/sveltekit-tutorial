import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FB_CLIENT_ADMIN, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			clientEmail: FB_CLIENT_ADMIN,
			privateKey: FB_PRIVATE_KEY,
			projectId: FB_PROJECT_ID
		})
	});
} catch (error: any) {
	if (!/already exists/.test(error.message)) {
		console.error('Fireabse admin error: ', error.stack);
	}
}
