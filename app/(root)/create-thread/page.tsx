import { CreateThreadPageContainer } from "@/containers/root/CreateThreadPageContainer/CreateThreadPageContainer";
import { checkUser } from "@/lib/checkUser";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Thread",
	description: "Create Thread Page of Threads",
};

export default async function CreateThreadPage() {
	const { dbUser } = await checkUser();

	return <CreateThreadPageContainer userInfo={dbUser} />;
}
