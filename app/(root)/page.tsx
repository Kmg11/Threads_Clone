import { HomePageContainer } from "@/containers/root/HomePageContainer/HomePageContainer";
import { checkUser } from "@/lib/checkUser";
import { SearchParamsType } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "Home Page of Threads",
};

interface HomePageProps extends SearchParamsType {}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { clerkUser } = await checkUser();

	return (
		<HomePageContainer
			searchParams={searchParams}
			currentUserId={clerkUser.id}
		/>
	);
}
