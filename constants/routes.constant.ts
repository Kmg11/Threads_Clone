export const ROUTES = {
	AUTH: {
		SIGNIN: "/sign-in",
		SIGNUP: "/sign-up",
		ONBOARDING: "/onboarding",
	},

	HOME: "/",
	SEARCH: "/search",
	ACTIVITY: "/activity",
	CREATE_THREAD: "/create-thread",
	COMMUNITIES: "/communities",
	THREAD: (threadId: string) => `/thread/${threadId}`,

	PROFILE: {
		BASE: "/profile",
		EDIT: "/profile/edit",
		USER_PROFILE: (userId: string) => `/profile/${userId}`,
	},
};
