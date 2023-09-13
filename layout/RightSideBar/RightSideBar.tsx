import React from "react";
import RightSidebarStyles from "./RightSideBar.module.css";
import { currentUser } from "@clerk/nextjs";
import { searchUsersAction } from "@/server/actions/userActions/searchUsers.action";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import { getCommunitiesAction } from "@/server/actions/community/getCommunities.action";
import { UserCard } from "@/components/cards/UserCard/UserCard";

export const RightSideBar = async () => {
	const user = await currentUser();
	if (!user) return redirect(ROUTES.AUTH.SIGNIN);

	const suggestedUsers = await searchUsersAction({
		userId: user.id,
		limit: 4,
		page: 1,
		searchString: "",
		sortBy: "desc",
	});

	const suggestedCommunities = await getCommunitiesAction({
		pageSize: 4,
		pageNumber: 1,
		sortBy: "desc",
		searchString: "",
	});

	return (
		<section className={`custom-scrollbar ${RightSidebarStyles.RightSidebar}`}>
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">
					Suggested Communities
				</h3>

				<div className="mt-7 flex w-[350px] flex-col gap-9">
					{suggestedCommunities.communities.length > 0 ? (
						<>
							{suggestedCommunities.communities.map((community) => (
								<UserCard
									key={community.id}
									id={community.id}
									name={community.name}
									username={community.username}
									image={community.image}
									type="community"
								/>
							))}
						</>
					) : (
						<p className="no-result text-left">No communities yet</p>
					)}
				</div>
			</div>

			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
				<div className="mt-7 flex w-[350px] flex-col gap-10">
					{suggestedUsers.users.length > 0 ? (
						<>
							{suggestedUsers.users.map((person) => (
								<UserCard
									key={person.id}
									id={person.id}
									name={person.name}
									username={person.username}
									image={person.image}
									type="user"
								/>
							))}
						</>
					) : (
						<p className="no-result text-left">No users yet</p>
					)}
				</div>
			</div>
		</section>
	);
};
