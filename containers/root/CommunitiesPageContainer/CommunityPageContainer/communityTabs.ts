export enum CommunityTabs {
	THREADS = "threads",
	MEMBERS = "members",
}

export const communityTabs = [
	{ value: CommunityTabs.THREADS, label: "Threads", icon: "/assets/reply.svg" },
	{
		value: CommunityTabs.MEMBERS,
		label: "Members",
		icon: "/assets/members.svg",
	},
];
