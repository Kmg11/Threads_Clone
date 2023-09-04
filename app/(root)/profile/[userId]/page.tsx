import React from "react";
import { checkUser } from "@/lib/checkUser";
import { ProfilePageContainer } from "@/containers/root/ProfilePageContainer/ProfilePageContainer";
import { Metadata } from "next";
import { getUserAction } from "@/server/actions/userActions/getUser.action";

interface ProfilePageProps {
	params: { userId: string };
}

export async function generateMetadata({
	params,
}: ProfilePageProps): Promise<Metadata> {
	const userInfo = await getUserAction(params.userId);

	return {
		title: userInfo?.name,
		description: userInfo?.name,
	};
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	const { clerkUser } = await checkUser();

	return (
		<ProfilePageContainer userId={params.userId} currentUserId={clerkUser.id} />
	);
}
