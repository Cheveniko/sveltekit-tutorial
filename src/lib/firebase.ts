import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';
import { FB_SECRET_KEY } from '$env/static/private';

const firebaseConfig = {
	apiKey: FB_SECRET_KEY,
	authDomain: 'sveltekit-tutorial-f3be7.firebaseapp.com',
	projectId: 'sveltekit-tutorial-f3be7',
	storageBucket: 'sveltekit-tutorial-f3be7.appspot.com',
	messagingSenderId: '1047984581315',
	appId: '1:1047984581315:web:0d6c074aca9d7cf9d39076'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 *
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.log('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);

		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe;
	});

	return {
		subscribe
	};
}

export const user = userStore();
