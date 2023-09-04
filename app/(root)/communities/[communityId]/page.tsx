import React from "react";
import { checkUser } from "@/lib/checkUser";
import { CommunityPageContainer } from "@/containers/root/CommunitiesPageContainer/CommunityPageContainer/CommunityPageContainer";

interface CommunityPageProps {
	params: { communityId: string };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
	const { user, userInfo } = await checkUser();

	return (
		<CommunityPageContainer
			currentUserId={user.id}
			userInfoId={userInfo?.id}
			communityId={params.communityId}
		/>
	);
}
