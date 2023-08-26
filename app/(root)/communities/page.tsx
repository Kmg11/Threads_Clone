import React from "react";
import { CommunitiesPageContainer } from "@/containers/root/CommunitiesPageContainer/CommunitiesPageContainer";
import { checkUser } from "@/lib/checkUser";
import { SearchParamsType } from "@/types";

interface CommunitiesPageProps extends SearchParamsType {}

export default async function CommunitiesPage({
	searchParams,
}: CommunitiesPageProps) {
	await checkUser();

	return <CommunitiesPageContainer searchParams={searchParams} />;
}
