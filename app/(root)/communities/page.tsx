import CommunityCard from "@/components/cards/CommunityCard/CommunityCard";
import { checkUser } from "@/lib/checkUser";
import { fetchCommunities } from "@/server/actions/community/community.actions";
import React from "react";

export default async function CommunitiesPage() {
	await checkUser();

	const { isNext, communities } = await fetchCommunities({
		pageNumber: 1,
		pageSize: 20,
		searchString: "",
		sortBy: "desc",
	});

	return (
		<section>
			<h1 className="head-text mb-10">Communities</h1>

			{/* Search Bar */}

			<div className="mt-14 flex flex-col gap-9">
				{communities.length === 0 ? (
					<p className="no-result">No users</p>
				) : (
					communities.map((community) => (
						<CommunityCard
							key={community.id}
							id={community.id}
							name={community.name}
							username={community.username}
							imgUrl={community.image}
							bio={community.bio}
							members={community.members}
						/>
					))
				)}
			</div>
		</section>
	);
}
