import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { ROUTES } from "@/constants";
import { getCommunityThreadsAction } from "@/server/actions/community/getCommunityThreads.action";
import { getUserRepliesThreadsAction } from "@/server/actions/threadActions/getUserRepliesThreads.action";
import { getUserThreadsAction } from "@/server/actions/userActions/getUserThreads.action";
import { ThreadType, UserType } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

interface ThreadsTabProps {
	currentUserId: string;
	accountId: UserType["_id"];
	accountType: "user" | "userReplies" | "community";
}

export const ThreadsTab = async ({
	accountId,
	accountType,
	currentUserId,
}: ThreadsTabProps) => {
	let threads: ThreadType[] = [];

	if (accountType === "user") {
		threads = (await getUserThreadsAction(accountId)).threads;
	} else if (accountType === "userReplies") {
		threads = (await getUserRepliesThreadsAction(accountId)).threads;
	} else if (accountType === "community") {
		threads = (await getCommunityThreadsAction(accountId)).threads;
	}

	return (
		<section className="mt-9 flex flex-col gap-10">
			{threads.length > 0 &&
				threads.map((thread: any) => (
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

			{threads.length === 0 && <p className="no-result">No threads yet</p>}
		</section>
	);
};
