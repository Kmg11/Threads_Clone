import { AccountProfileForm } from "@/components/forms/AccountProfileForm/AccountProfileForm";
import { checkUser } from "@/lib/checkUser";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit Profile",
	description: "Edit Profile Page of Threads",
};

export default async function ProfileEditPage() {
	const { clerkUser, dbUser } = await checkUser();

	return (
		<>
			<h1 className="head-text">Edit Profile</h1>

			<section className="mt-12">
				<AccountProfileForm clerkUser={clerkUser} dbUser={dbUser} />
			</section>
		</>
	);
}
