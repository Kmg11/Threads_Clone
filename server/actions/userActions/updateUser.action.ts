"use server";

import { UserModel, connectToDB } from "@/server";
import { revalidatePath } from "next/cache";

interface UpdateUserActionParams {
	userId: string;
	username: string;
	name: string;
	image: string;
	path: string;
	bio: string;
}

export async function updateUserAction({
	userId,
	username,
	name,
	bio,
	image,
	path,
}: UpdateUserActionParams): Promise<void> {
	connectToDB();

	try {
		await UserModel.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{ upsert: true }
		);

		if (path === "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}
