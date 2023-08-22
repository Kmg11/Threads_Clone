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
	COMMUNITY: (communityId: Types.ObjectId | string) =>
		`/communities/${communityId}`,
	THREAD: (threadId: Types.ObjectId | string) => `/thread/${threadId}`,

	PROFILE: {
		EDIT: "/profile/edit",
		USER_PROFILE: (userId: Types.ObjectId | string) => `/profile/${userId}`,
	},
};
