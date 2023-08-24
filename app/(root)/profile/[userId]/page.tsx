import React from "react";
import Image from "next/image";
import { ProfileHeader } from "@/components/shared/ProfileHeader/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThreadsTab } from "@/components/shared/ThreadsTab/ThreadsTab";
import { checkUser } from "@/lib/checkUser";

enum ProfileTabs {
	THREADS = "threads",
	REPLIES = "replies",
	TAGGED = "tagged",
}

const profileTabs = [
	{ value: ProfileTabs.THREADS, label: "Threads", icon: "/assets/reply.svg" },
	{ value: ProfileTabs.REPLIES, label: "Replies", icon: "/assets/members.svg" },
	{ value: ProfileTabs.TAGGED, label: "Tagged", icon: "/assets/tag.svg" },
];

interface ProfilePageProps {
	params: {
		userId: string;
	};
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	const { user, userInfo } = await checkUser();

	return (
		<section>
			<ProfileHeader
				authUserId={user.id}
				userId={userInfo._id}
				name={userInfo.name}
				username={userInfo.username}
				image={userInfo.image}
				bio={userInfo.bio}
			/>

			<div className="mt-9">
				<Tabs defaultValue={ProfileTabs.THREADS} className="w-full">
					<TabsList className="tab">
						{profileTabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value} className="tab">
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className="object-contain"
								/>

								<p className="max-sm:hidden">{tab.label}</p>

								{tab.value === ProfileTabs.THREADS && (
									<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
										{userInfo.threads.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>

					{profileTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className="w-full text-light-1"
						>
							<ThreadsTab
								currentUserId={user.id}
								accountId={userInfo._id}
								accountType="user"
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
