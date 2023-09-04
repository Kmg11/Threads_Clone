import React from "react";
import { checkUser } from "@/lib/checkUser";
import { CommunityPageContainer } from "@/containers/root/CommunitiesPageContainer/CommunityPageContainer/CommunityPageContainer";
import { Metadata } from "next";
import { getCommunityDetailsAction } from "@/server/actions/community/getCommunityDetails.action";

interface CommunityPageProps {
	params: { communityId: string };
}

export async function generateMetadata({
	params,
}: CommunityPageProps): Promise<Metadata> {
	const communityDetails = await getCommunityDetailsAction(params.communityId);

	return {
		title: communityDetails?.name,
		description: `${communityDetails?.name} community created by ${communityDetails?.createdBy.name}`,
	};
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
