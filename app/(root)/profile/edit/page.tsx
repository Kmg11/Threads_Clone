import { AccountProfileForm } from "@/components/forms/AccountProfileForm/AccountProfileForm";
import { checkUser } from "@/lib/checkUser";
import { UserType } from "@/types";

export default async function ProfileEditPage() {
	const { user, userInfo } = await checkUser();

	const userData: Pick<UserType, "id" | "username" | "name" | "bio" | "image"> =
		{
			id: user.id,
			username: userInfo?.username || user.username || "",
			name: userInfo?.name || `${user.firstName} ${user.lastName}`,
			bio: userInfo?.bio,
			image: userInfo?.image || user.imageUrl,
		};

	return (
		<>
			<h1 className="head-text">Edit Profile</h1>

			<section className="mt-12">
				<AccountProfileForm user={userData} />
			</section>
		</>
	);
}
