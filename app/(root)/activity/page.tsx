import React from "react";
import { checkUser } from "@/lib/checkUser";
import { ActivityPageContainer } from "@/containers/root/ActivityPageContainer/ActivityPageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Activity",
	description: "Activity Page of Threads",
};

export default async function ActivityPage() {
	const { dbUser } = await checkUser();

	return <ActivityPageContainer userInfo={dbUser} />;
}
