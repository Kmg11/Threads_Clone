import React from "react";
import { checkUser } from "@/lib/checkUser";
import { CommunityPageContainer } from "@/containers/root/CommunitiesPageContainer/CommunityPageContainer/CommunityPageContainer";

interface CommunityPageProps {
	params: { communityId: string };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
	const { clerkUser, dbUser } = await checkUser();

	return (
		<CommunityPageContainer
			currentUserId={clerkUser.id}
			userInfoId={dbUser?.id}
			communityId={params.communityId}
		/>
	);
}
