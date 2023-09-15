"use server";

import { ROUTES } from "@/constants";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function checkUser() {
	const clerkUser = await currentUser();
	if (!clerkUser) redirect(ROUTES.AUTH.SIGNIN);

	const dbUser = await getUserAction(clerkUser.id);
	if (!dbUser?.onboarded) redirect(ROUTES.AUTH.ONBOARDING);

	return { clerkUser, dbUser };
}
