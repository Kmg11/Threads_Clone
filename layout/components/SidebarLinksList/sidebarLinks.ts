import { ROUTES } from "@/constants";
import { UserType } from "@/types";

interface SideBarLinksType {
	imgURL: string;
	route: string;
	label: string;
}

export const getSideBarLinks = (
	userId: string | UserType["_id"]
): SideBarLinksType[] => [
	{
		imgURL: "/assets/home.svg",
		route: ROUTES.HOME,
		label: "Home",
	},
	{
		imgURL: "/assets/search.svg",
		route: ROUTES.SEARCH,
		label: "Search",
	},
	{
		imgURL: "/assets/heart.svg",
		route: ROUTES.ACTIVITY,
		label: "Activity",
	},
	{
		imgURL: "/assets/create.svg",
		route: ROUTES.CREATE_THREAD,
		label: "Create Thread",
	},
	{
		imgURL: "/assets/community.svg",
		route: ROUTES.COMMUNITIES,
		label: "Communities",
	},
	{
		imgURL: "/assets/user.svg",
		route: ROUTES.PROFILE.USER_PROFILE(userId),
		label: "Profile",
	},
];
