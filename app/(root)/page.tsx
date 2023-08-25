import { ThreadCard } from "@/components/cards/ThreadCard/ThreadCard";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import { ROUTES } from "@/constants";
import { checkUser } from "@/lib/checkUser";
import { getThreadsAction } from "@/server/actions/threadActions/getThreads.action";

interface HomePageProps {
	searchParams: { [key: string]: string | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { user } = await checkUser();

	const currentPageNumber = searchParams?.page ? +searchParams.page : 1;

	const { threads, isNext } = await getThreadsAction({
		page: currentPageNumber,
		limit: 30,
	});

	return (
		<>
			<section className="flex flex-col gap-10">
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

			<Pagination
				path={ROUTES.HOME}
				pageNumber={currentPageNumber}
				isNext={isNext}
			/>
		</>
	);
}
