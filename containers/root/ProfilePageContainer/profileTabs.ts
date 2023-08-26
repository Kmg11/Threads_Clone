export enum ProfileTabs {
	THREADS = "threads",
	REPLIES = "replies",
}

export const profileTabs = [
	{ value: ProfileTabs.THREADS, label: "Threads", icon: "/assets/reply.svg" },
	{ value: ProfileTabs.REPLIES, label: "Replies", icon: "/assets/members.svg" },
];
