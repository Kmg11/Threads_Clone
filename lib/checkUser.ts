import { ROUTES } from "@/constants";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function checkUser() {
	const user = await currentUser();
	if (!user) return redirect(ROUTES.AUTH.SIGNIN);

	const userInfo = await getUserAction(user.id);
	if (!userInfo?.onboarded) return redirect(ROUTES.AUTH.ONBOARDING);

	return { user, userInfo };
}
