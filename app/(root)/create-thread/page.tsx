import { PostThreadFrom } from "@/components/forms/PostThreadFrom/PostThreadFrom";
import { ROUTES } from "@/constants";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function CreateThreadPage() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await getUserAction(user.id);
	if (!userInfo?.onboarded) return redirect(ROUTES.AUTH.ONBOARDING);

	return (
		<>
			<h1 className="head-text">Create Thread</h1>

			<PostThreadFrom userId={userInfo._id} />
		</>
	);
}
