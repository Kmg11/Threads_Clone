import React from "react";
import { UserCard } from "@/components/cards/UserCard/UserCard";
import { checkUser } from "@/lib/checkUser";
import { searchUsersAction } from "@/server/actions/userActions/searchUsers.action";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import { ROUTES } from "@/constants";

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { user } = await checkUser();

	const currentPageNumber = searchParams?.page ? +searchParams.page : 1;

	const { isNext, users } = await searchUsersAction({
		page: currentPageNumber,
		limit: 25,
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

			<Pagination
				path={ROUTES.SEARCH}
				pageNumber={currentPageNumber}
				isNext={isNext}
			/>
		</section>
	);
}
