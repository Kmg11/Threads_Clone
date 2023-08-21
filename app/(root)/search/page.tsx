import { UserCard } from "@/components/cards/UserCard/UserCard";
import { ROUTES } from "@/constants";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { searchUsersAction } from "@/server/actions/userActions/searchUsers.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function SearchPage() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await getUserAction(user.id);
	if (!userInfo?.onboarded) return redirect(ROUTES.AUTH.ONBOARDING);

	const { isNext, users } = await searchUsersAction({
		page: 1,
		limit: 20,
		userId: userInfo._id,
		searchString: "",
		sortBy: "desc",
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			{/* Search Bar */}

			<div className="mt-14 flex flex-col gap-9">
				{users.length === 0 ? (
					<p className="no-result">No users</p>
				) : (
					users.map((user) => (
						<UserCard
							key={user.id}
							id={user.id}
							name={user.name}
							username={user.username}
							image={user.image}
							type="user"
						/>
					))
				)}
			</div>
		</section>
	);
}
