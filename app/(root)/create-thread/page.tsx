import { PostThreadFrom } from "@/components/forms/PostThreadFrom/PostThreadFrom";
import { checkUser } from "@/lib/checkUser";

export default async function CreateThreadPage() {
	const { userInfo } = await checkUser();

	return (
		<>
			<h1 className="head-text">Create Thread</h1>

			<PostThreadFrom userId={userInfo._id} />
		</>
	);
}
