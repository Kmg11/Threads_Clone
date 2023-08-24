import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { CreateCommentForm } from "@/components/forms/CreateCommentForm/CreateCommentForm";
import { checkUser } from "@/lib/checkUser";
import { getThreadAction } from "@/server/actions/threadActions/getThread.action";

interface ThreadPageProps {
	params: {
		threadId: string;
	};
}

export default async function ThreadPage({ params }: ThreadPageProps) {
	const { user, userInfo } = await checkUser();
	const { thread } = await getThreadAction(params.threadId);
	if (!thread) return null;

	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id.toString()}
					currentUserId={user?.id}
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
						currentUserId={user?.id}
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
}
