import React from "react";
import { AccountProfileForm } from "@/components/forms/AccountProfileForm/AccountProfileForm";
import { UserType } from "@/types";
import { User } from "@clerk/nextjs/server";

interface OnboardingPageContainerProps {
	user: User;
	userInfo: UserType | null;
}

export const OnboardingPageContainer = ({
	user,
	userInfo,
}: OnboardingPageContainerProps) => {
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
};