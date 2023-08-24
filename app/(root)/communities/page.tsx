import CommunityCard from "@/components/cards/CommunityCard/CommunityCard";
import { UserCard } from "@/components/cards/UserCard/UserCard";
import { ROUTES } from "@/constants";
import { fetchCommunities } from "@/server/actions/community/community.actions";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { searchUsersAction } from "@/server/actions/userActions/searchUsers.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function CommunitiesPage() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await getUserAction(user.id);
	if (!userInfo?.onboarded) return redirect(ROUTES.AUTH.ONBOARDING);

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
