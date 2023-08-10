interface SideBarLinksType {
	imgURL: string;
	route: string;
	label: string;
}

export const sideBarLinks: SideBarLinksType[] = [
	{
		imgURL: "/assets/home.svg",
		route: "/",
		label: "Home",
	},
	{
		imgURL: "/assets/search.svg",
		route: "/search",
		label: "Search",
	},
	{
		imgURL: "/assets/heart.svg",
		route: "/activity",
		label: "Activity",
	},
	{
		imgURL: "/assets/create.svg",
		route: "/create-thread",
		label: "Create Thread",
	},
	{
		imgURL: "/assets/community.svg",
		route: "/communities",
		label: "Communities",
	},
	{
		imgURL: "/assets/user.svg",
		route: "/profile",
		label: "Profile",
	},
];
