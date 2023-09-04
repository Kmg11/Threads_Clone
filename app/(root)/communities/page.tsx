import React from "react";
import { CommunitiesPageContainer } from "@/containers/root/CommunitiesPageContainer/CommunitiesPageContainer";
import { checkUser } from "@/lib/checkUser";
import { SearchParamsType } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Communities",
	description: "Communities Page of Threads",
};

interface CommunitiesPageProps extends SearchParamsType {}

export default async function CommunitiesPage({
	searchParams,
}: CommunitiesPageProps) {
	await checkUser();

	return <CommunitiesPageContainer searchParams={searchParams} />;
}
