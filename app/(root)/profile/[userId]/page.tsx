import React from "react";
import { checkUser } from "@/lib/checkUser";
import { ProfilePageContainer } from "@/containers/root/ProfilePageContainer/ProfilePageContainer";

interface ProfilePageProps {
	params: { userId: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	const { clerkUser } = await checkUser();

	return (
		<ProfilePageContainer userId={params.userId} currentUserId={clerkUser.id} />
	);
}
