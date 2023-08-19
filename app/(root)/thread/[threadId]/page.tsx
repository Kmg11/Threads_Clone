import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { CreateCommentForm } from "@/components/forms/CreateCommentForm/CreateCommentForm";
import { ROUTES } from "@/constants";
import { getThreadAction } from "@/server/actions/threadActions/getThread.action";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ThreadPageProps {
	params: {
		threadId: string;
	};
}

export default async function ThreadPage({ params }: ThreadPageProps) {
	if (!params.threadId) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await getUserAction(user.id);
	if (!userInfo?.onboarded) redirect(ROUTES.AUTH.ONBOARDING);

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
					currentUserImg={user.imageUrl}
					currentUserId={userInfo._id}
				/>
			</div>
		</section>
	);
}
