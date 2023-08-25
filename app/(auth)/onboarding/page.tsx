import { AccountProfileForm } from "@/components/forms/AccountProfileForm/AccountProfileForm";
import { ROUTES } from "@/constants";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { UserType } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Onboarding() {
	const user = await currentUser();
	if (!user) return redirect(ROUTES.AUTH.SIGNIN);

	const userInfo = await getUserAction(user.id);
	if (userInfo?.onboarded) return redirect(ROUTES.HOME);

	const userData: Pick<UserType, "id" | "username" | "name" | "bio" | "image"> =
		{
			id: user.id,
			username: userInfo?.username || user.username || "",
			name: userInfo?.name || `${user.firstName} ${user.lastName}`,
			bio: userInfo?.bio,
			image: userInfo?.image || user.imageUrl,
		};

	return (
		<main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
			<h1 className="head-text">Onboarding</h1>

			<p className="mt-3 text-base-regular text-light-2">
				Complete your profile now to use Threads
			</p>

			<section className="my-9 bg-dark-2 p-10">
				<AccountProfileForm user={userData} />
			</section>
		</main>
	);
}
