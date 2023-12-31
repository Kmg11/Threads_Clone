import React from "react";
import { UserCard } from "@/components/cards/UserCard/UserCard";
import { searchUsersAction } from "@/server/actions/userActions/searchUsers.action";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import { ROUTES } from "@/constants";
import { SearchParamsType } from "@/types";
import { User } from "@clerk/nextjs/server";
import { SearchBar } from "@/components/shared/SearchBar/SearchBar";

interface SearchPageContainerProps extends SearchParamsType {
	currentUserId: User["id"];
}

export const SearchPageContainer = async ({
	searchParams,
	currentUserId,
}: SearchPageContainerProps) => {
	const currentPageNumber = searchParams?.page ? +searchParams.page : 1;

	const { isNext, users } = await searchUsersAction({
		page: currentPageNumber,
		limit: 25,
		userId: currentUserId,
		searchString: searchParams.search,
		sortBy: "desc",
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			<SearchBar routeType="search" />

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
};
