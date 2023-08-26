import { ThreadPageContainer } from "@/containers/root/ThreadPageContainer/ThreadPageContainer";
import { checkUser } from "@/lib/checkUser";

interface ThreadPageProps {
	params: { threadId: string };
}

export default async function ThreadPage({ params }: ThreadPageProps) {
	const { userInfo } = await checkUser();

	return <ThreadPageContainer threadId={params.threadId} userInfo={userInfo} />;
}
