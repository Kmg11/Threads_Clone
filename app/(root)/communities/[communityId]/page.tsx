import React from "react";
import Image from "next/image";
import { ProfileHeader } from "@/components/shared/ProfileHeader/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThreadsTab } from "@/components/shared/ThreadsTab/ThreadsTab";
import { UserCard } from "@/components/cards/UserCard/UserCard";
import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import { getCommunityDetailsAction } from "@/server/actions/community/getCommunityDetails.action";

enum CommunityTabs {
	THREADS = "threads",
	MEMBERS = "members",
	REQUESTS = "requests",
}

const communityTabs = [
	{ value: CommunityTabs.THREADS, label: "Threads", icon: "/assets/reply.svg" },
	{
		value: CommunityTabs.MEMBERS,
		label: "Members",
		icon: "/assets/members.svg",
	},
	{
		value: CommunityTabs.REQUESTS,
		label: "Requests",
		icon: "/assets/request.svg",
	},
];

interface CommunityPageProps {
	params: {
		communityId: string;
	};
}

export default async function CommunityPage({ params }: CommunityPageProps) {
	const { user } = await checkUser();
	const communityDetails = await getCommunityDetailsAction(params.communityId);
	if (!communityDetails) return redirect(ROUTES.HOME);

	return (
		<section>
			<ProfileHeader
				authUserId={user.id}
				userId={communityDetails._id}
				name={communityDetails.name}
				username={communityDetails.username}
				image={communityDetails.image}
				bio={communityDetails.bio}
				type="community"
			/>

			<div className="mt-9">
				<Tabs defaultValue={CommunityTabs.THREADS} className="w-full">
					<TabsList className="tab">
						{communityTabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value} className="tab">
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className="object-contain"
								/>

								<p className="max-sm:hidden">{tab.label}</p>

								{tab.value === CommunityTabs.THREADS && (
									<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
										{communityDetails.threads.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent
						value={CommunityTabs.THREADS}
						className="w-full text-light-1"
					>
						<ThreadsTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType="community"
						/>
					</TabsContent>

					<TabsContent
						value={CommunityTabs.MEMBERS}
						className="w-full text-light-1"
					>
						<section className="mt-9 flex flex-col gap-10">
							{communityDetails.members.map((member: any) => (
								<UserCard
									key={member.id}
									id={member.id}
									name={member.name}
									username={member.username}
									image={member.image}
									type="user"
								/>
							))}
						</section>
					</TabsContent>

					<TabsContent
						value={CommunityTabs.REQUESTS}
						className="w-full text-light-1"
					>
						<ThreadsTab
							currentUserId={user.id}
							accountId={communityDetails._id}
							accountType="community"
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
