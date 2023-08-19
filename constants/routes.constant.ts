import { Types } from "mongoose";

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
	THREAD: (threadId: Types.ObjectId) => `/thread/${threadId}`,

	PROFILE: {
		BASE: "/profile",
		EDIT: "/profile/edit",
		USER_PROFILE: (userId: Types.ObjectId) => `/profile/${userId}`,
	},
};
