import React from "react";
import { checkUser } from "@/lib/checkUser";
import { SearchParamsType } from "@/types";
import { SearchPageContainer } from "@/containers/root/SearchPageContainer/SearchPageContainer";

interface SearchPageProps extends SearchParamsType {}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { clerkUser } = await checkUser();

	return (
		<SearchPageContainer
			searchParams={searchParams}
			currentUserId={clerkUser.id}
		/>
	);
}
