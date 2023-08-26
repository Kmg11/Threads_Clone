import React from "react";
import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { CreateCommentForm } from "@/components/forms/CreateCommentForm/CreateCommentForm";
import { getThreadAction } from "@/server/actions/threadActions/getThread.action";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import { UserType } from "@/types";

interface ThreadPageContainerProps {
	threadId: string;
	userInfo: UserType;
}

export const ThreadPageContainer = async ({
	threadId,
	userInfo,
}: ThreadPageContainerProps) => {
	const { thread } = await getThreadAction(threadId);
	if (!thread) return redirect(ROUTES.HOME);

	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id.toString()}
					currentUserId={userInfo.id}
					_id={thread._id}
					text={thread.text}
					author={thread.author}
					community={thread.community}
					parentId={thread.parentId}
					createdAt={thread.createdAt}
					updatedAt={thread.updatedAt}
					comments={thread.comments}
				/>
			</div>

			<div className="my-7">
				<CreateCommentForm
					threadId={thread._id}
					currentUserImg={userInfo.image || ""}
					currentUserId={userInfo._id}
					currentUserName={userInfo.name}
				/>
			</div>

			<div className="mt-10">
				{thread.comments.map((comment) => (
					<ThreadCard
						key={comment._id.toString()}
						currentUserId={userInfo?.id}
						_id={comment._id}
						text={comment.text}
						author={comment.author}
						community={comment.community}
						parentId={comment.parentId}
						createdAt={comment.createdAt}
						updatedAt={comment.updatedAt}
						comments={comment.comments}
						isComment={true}
					/>
				))}
			</div>
		</section>
	);
};
