import { ROUTES } from "@/constants";
import { OnboardingPageContainer } from "@/containers/auth/OnboardingPageContainer/OnboardingPageContainer";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Onboarding",
	description: "Onboarding Page of Threads",
};

export default async function Onboarding() {
	const user = await currentUser();
	if (!user) return redirect(ROUTES.AUTH.SIGNIN);

	const userInfo = await getUserAction(user.id);
	if (userInfo?.onboarded) return redirect(ROUTES.HOME);

	return <OnboardingPageContainer user={user} userInfo={userInfo} />;
}
