import CommunityCard from "@/components/cards/CommunityCard/CommunityCard";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import { ROUTES } from "@/constants";
import { checkUser } from "@/lib/checkUser";
import { getCommunitiesAction } from "@/server/actions/community/getCommunities.action";
import React from "react";

interface CommunitiesPageProps {
	searchParams: { [key: string]: string | undefined };
}

export default async function CommunitiesPage({
	searchParams,
}: CommunitiesPageProps) {
	await checkUser();

	const currentPageNumber = searchParams?.page ? +searchParams.page : 1;

	const { isNext, communities } = await getCommunitiesAction({
		pageNumber: currentPageNumber,
		pageSize: 2,
		searchString: "",
		sortBy: "desc",
	});

	return (
		<section>
			<h1 className="head-text mb-10">Communities</h1>

			{/* Search Bar */}

			<div className="mt-14 flex flex-wrap gap-4">
				{communities.length === 0 ? (
					<p className="no-result">No users</p>
				) : (
					communities.map((community) => (
						<CommunityCard
							key={community.id}
							id={community.id}
							name={community.name}
							username={community.username}
							image={community.image}
							bio={community.bio}
							members={community.members}
						/>
					))
				)}
			</div>

			<Pagination
				path={ROUTES.COMMUNITIES}
				pageNumber={currentPageNumber}
				isNext={isNext}
			/>
		</section>
	);
}
