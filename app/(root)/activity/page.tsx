import React from "react";
import { checkUser } from "@/lib/checkUser";
import { ActivityPageContainer } from "@/containers/root/ActivityPageContainer/ActivityPageContainer";

export default async function ActivityPage() {
	const { dbUser } = await checkUser();

	return <ActivityPageContainer userInfo={dbUser} />;
}
