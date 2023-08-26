import { CreateThreadPageContainer } from "@/containers/root/CreateThreadPageContainer/CreateThreadPageContainer";
import { checkUser } from "@/lib/checkUser";

export default async function CreateThreadPage() {
	const { userInfo } = await checkUser();

	return <CreateThreadPageContainer userInfo={userInfo} />;
}
