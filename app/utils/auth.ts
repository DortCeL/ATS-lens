import puter from "@heyputer/puter.js";

export const checkAuth: () => Promise<boolean> = async () => {
	const isAuthenticated = await puter.auth.isSignedIn();
	return isAuthenticated;
};
