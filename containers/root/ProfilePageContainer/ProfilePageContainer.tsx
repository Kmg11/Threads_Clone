import React from "react";
import Image from "next/image";
import { ProfileHeader } from "@/components/shared/ProfileHeader/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThreadsTab } from "@/components/shared/ThreadsTab/ThreadsTab";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import { User } from "@clerk/nextjs/server";
import { ProfileTabs, profileTabs } from "./profileTabs";

interface ProfilePageContainerProps {
	userId: string;
	currentUserId: User["id"];
}

export const ProfilePageContainer = async ({
	userId,
	currentUserId,
}: ProfilePageContainerProps) => {
	const userInfo = await getUserAction(userId);
	if (!userInfo) return redirect(ROUTES.HOME);

	return (
		<section>
			<ProfileHeader
				authUserId={currentUserId}
				userId={userInfo._id}
				name={userInfo.name}
				username={userInfo.username}
				image={userInfo.image}
				bio={userInfo.bio}
			/>

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

							{tab.value === ProfileTabs.THREADS &&
								userInfo.threads.length > 0 && (
									<p className="ms-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
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
							currentUserId={currentUserId}
							accountId={userInfo._id}
							accountType="user"
						/>
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};
