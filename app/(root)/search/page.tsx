import React from "react";
import { UserCard } from "@/components/cards/UserCard/UserCard";
import { checkUser } from "@/lib/checkUser";
import { searchUsersAction } from "@/server/actions/userActions/searchUsers.action";

export default async function SearchPage() {
	const { user } = await checkUser();
	const { isNext, users } = await searchUsersAction({
		page: 1,
		limit: 20,
		userId: user.id,
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
