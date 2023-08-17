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
					threads.map((thread) => (
						<ThreadCard
							key={thread._id}
							id={thread._id}
							currentUserId={user?.id}
							parentId={thread.parentId}
							content={thread.text}
							author={thread.author}
							community={thread.community}
							createdAt={thread.createdAt}
							comments={thread.children}
						/>
					))
				) : (
					<p className="no-result">No threads found</p>
				)}
			</section>
		</>
	);
}
