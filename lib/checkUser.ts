import { ROUTES } from "@/constants";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function checkUser() {
	const clerkUser = await currentUser();
	if (!clerkUser) return redirect(ROUTES.AUTH.SIGNIN);

	const dbUser = await getUserAction(clerkUser.id);
	if (!dbUser?.onboarded) return redirect(ROUTES.AUTH.ONBOARDING);

	return { clerkUser, dbUser };
}
