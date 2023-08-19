import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { getThreadsAction } from "@/server/actions/threadActions/getThreads.action";
import { currentUser } from "@clerk/nextjs";

export default async function HomePage() {
	const user = await currentUser();
	if (!user) return null;

	const { threads } = await getThreadsAction({ page: 1, limit: 10 });

	return (
		<>
			<h1 className="head-text text-left">Home</h1>

			<section className="mt-9 flex flex-col gap-10">
				{threads.length > 0 ? (
					threads.map((thread) => {
						return (
							<ThreadCard
								key={`${thread._id}`}
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
						);
					})
				) : (
					<p className="no-result">No threads found</p>
				)}
			</section>
		</>
	);
}
