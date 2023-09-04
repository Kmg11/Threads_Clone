import { ThreadPageContainer } from "@/containers/root/ThreadPageContainer/ThreadPageContainer";
import { checkUser } from "@/lib/checkUser";
import { getThreadAction } from "@/server/actions/threadActions/getThread.action";
import { Metadata, ResolvingMetadata } from "next";

interface ThreadPageProps {
	params: { threadId: string };
}

export async function generateMetadata({
	params,
}: ThreadPageProps): Promise<Metadata> {
	const { thread } = await getThreadAction(params.threadId);

	return {
		title: thread.text.slice(0, 50),
		description: thread.text.slice(0, 100),
	};
}

export default async function ThreadPage({ params }: ThreadPageProps) {
	const { dbUser } = await checkUser();

	return <ThreadPageContainer threadId={params.threadId} userInfo={dbUser} />;
}
