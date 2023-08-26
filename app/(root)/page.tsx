import { HomePageContainer } from "@/containers/root/HomePageContainer/HomePageContainer";
import { checkUser } from "@/lib/checkUser";
import { SearchParamsType } from "@/types";

interface HomePageProps extends SearchParamsType {}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { user } = await checkUser();

	return (
		<HomePageContainer searchParams={searchParams} currentUserId={user.id} />
	);
}
