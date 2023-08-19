import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { getUserThreadsAction } from "@/server/actions/threadActions/getUserThreads.action";
import { UserType } from "@/types";
import React from "react";

interface ThreadsTabProps {
	currentUserId: string;
	accountId: UserType["_id"];
	accountType: "user";
}

export const ThreadsTab = async ({
	accountId,
	accountType,
	currentUserId,
}: ThreadsTabProps) => {
	const { threads } = await getUserThreadsAction(accountId);

	return (
		<section className="mt-9 flex flex-col gap-10">
			{threads.map((thread) => (
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
