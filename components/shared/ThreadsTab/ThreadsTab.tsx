import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { ROUTES } from "@/constants";
import { getCommunityThreadsAction } from "@/server/actions/community/getCommunityThreads.action";
import { getUserThreadsAction } from "@/server/actions/userActions/getUserThreads.action";
import { ThreadType, UserType } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

interface ThreadsTabProps {
	currentUserId: string;
	accountId: UserType["_id"];
	accountType: "user" | "community";
}

export const ThreadsTab = async ({
	accountId,
	accountType,
	currentUserId,
}: ThreadsTabProps) => {
	let threads: ThreadType[];

	if (accountType === "user") {
		threads = (await getUserThreadsAction(accountId)).threads;
	} else {
		threads = (await getCommunityThreadsAction(accountId)).threads;
	}

	if (!threads) redirect(ROUTES.HOME);

	return (
		<section className="mt-9 flex flex-col gap-10">
			{threads.map((thread: any) => (
				<ThreadCard
					key={`${thread._id}`}
					currentUserId={currentUserId}
					_id={thread._id}
					text={thread.text}
					author={thread.author}
					community={thread.community}
					parentId={thread.parentId}
					createdAt={thread.createdAt}
					updatedAt={thread.updatedAt}
					comments={thread.comments}
				/>
			))}
		</section>
	);
};
