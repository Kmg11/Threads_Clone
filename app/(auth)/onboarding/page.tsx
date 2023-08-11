import { AccountProfileForm } from "@/components/forms/AccountProfileForm/AccountProfileForm";
import { currentUser } from "@clerk/nextjs";

export default async function Onboarding() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = {};

	const userData = {
		id: user.id,
		objectId: userInfo.objectId,
		username: userInfo.username || user.username,
		name: userInfo.name || user.firstName,
		bio: userInfo.bio || "",
		image: userInfo.image || user.imageUrl,
	};

	return (
		<main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
			<h1 className="head-text">Onboarding</h1>

			<p className="mt-3 text-base-regular text-light-2">
				Complete your profile now to use Threads
			</p>

			<section className="my-9 bg-dark-2 p-10">
				<AccountProfileForm user={userData} btnTitle="Continue" />
			</section>
		</main>
	);
}
